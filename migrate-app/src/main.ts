import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import config from './common/configuration';
import { Logger } from './guards/logger.guard';

async function bootstrap() {
  const adapterFastify = String(config().server.adapter);
  let app;
  adapterFastify === 'true'
    ? (app = await NestFactory.create<NestFastifyApplication>(
        AppModule,
        new FastifyAdapter(),
      ))
    : (app = await NestFactory.create(AppModule));
  app.useGlobalGuards(new Logger());
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(String(configService.get('PORT')), '0.0.0.0');
}
bootstrap();
