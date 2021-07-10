import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { finished } from 'stream';
import { User } from '../resources/users/users.entity';

@Injectable()
export class Logger implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    const date = new Date();
    const start = process.hrtime();
    finished(response, () => {
      const body: User = request.body;
      if (body.password) body.password = '******';
      console.log(
        request.ip.split(':').slice(-1) +
          ' - '.repeat(2) +
          '[' +
          this.formatDate(date) +
          ']' +
          " '" +
          request.method +
          ' ' +
          request.originalUrl +
          "' " +
          JSON.stringify(request.params) +
          ' ' +
          JSON.stringify(body) +
          ' ' +
          response.statusCode +
          ' ' +
          this.getRequestDuration(start).toLocaleString() +
          'ms\n',
      );
    });
    return true;
  }
  formatDate = (currentDate: Date): string => {
    return (
      currentDate.getFullYear() +
      '-' +
      ('0' + (currentDate.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + currentDate.getDate()).slice(-2) +
      ':' +
      currentDate.getHours() +
      ':' +
      ('0' + currentDate.getMinutes()).slice(-2) +
      ':' +
      ('0' + currentDate.getSeconds()).slice(-2)
    );
  };

  getRequestDuration = (start: [number, number]): number => {
    const SEC = 1e9;
    const MS = 1e6;
    const diff = process.hrtime(start);
    return (diff[0] * SEC + diff[1]) / MS;
  };
}
