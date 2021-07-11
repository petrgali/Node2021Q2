import { Injectable } from '@nestjs/common';
import { LoggerDTO } from './dto/logger.dto';

@Injectable()
export class LoggerService {
    log(data: LoggerDTO) {
        const { ip, currentDate, method, url, params, body, status, start } = data;
        console.log(
            ip.split(':').slice(-1) +
            ' - '.repeat(2) +
            '[' +
            this.formatDate(currentDate) +
            ']' +
            " '" +
            method +
            ' ' +
            url +
            "' " +
            params +
            ' ' +
            body +
            ' ' +
            status +
            ' ' +
            this.getRequestDuration(start).toLocaleString() +
            'ms\n',
        );
    }

    private formatDate = (currentDate: Date): string => {
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

    private getRequestDuration = (start: [number, number]): number => {
        const SEC = 1e9;
        const MS = 1e6;
        const diff = process.hrtime(start);
        return (diff[0] * SEC + diff[1]) / MS;
    };
}
