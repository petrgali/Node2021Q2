import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import config from './common/configuration';
import { Logger } from './guards/logger.guard';
import { LoggerService } from './modules/logger/logger.service';
import path from 'path';
import YAML from 'yamljs';

async function bootstrap() {
  const adapterFastify = String(config().server.adapter);
  let app;
  adapterFastify === 'true'
    ? (app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter(),
    ))
    : (app = await NestFactory.create(AppModule));

  const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
  SwaggerModule.setup('doc', app, swaggerDocument);

  app.useGlobalGuards(new Logger(new LoggerService()));
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(String(configService.get('PORT')), '0.0.0.0');
}
bootstrap();
