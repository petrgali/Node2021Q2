import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { finished } from 'stream';
import { User } from '../modules/users/users.entity';
import { LoggerService } from '../modules/logger/logger.service';

@Injectable()
export class Logger implements CanActivate {
  constructor(private readonly loggerService: LoggerService) {}
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
      this.loggerService.log({
        ip: request.ip,
        currentDate: date,
        method: request.method,
        url: request.originalUrl,
        params: JSON.stringify(request.params),
        body: body,
        status: response.statusCode,
        start: start,
      });
    });
    return true;
  }
}
