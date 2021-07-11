import { Catch, ArgumentsHost } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Catch()
export class ExceptionsLoggerFilter extends BaseExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const { ip, url, method } = host.getArgs()[1].req;

    console.log(
      'Exception thrown',
      {
        ip,
        url,
        method,
      },
      exception,
    );

    process.on('unhandledRejection', () => {
      console.log(
        'Rejection thrown',
        {
          ip,
          url,
          method,
        },
        exception,
      );
    });
    super.catch(exception, host);
  }
}
