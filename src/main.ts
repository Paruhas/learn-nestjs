import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from './config/interface/app-config.interface';
import { ITestConfig } from './config/interface/test-config.interface';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { IDatabaseConfig } from './config/interface/database-config.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig = configService.get<IAppConfig>('app');
  const testConfig = configService.get<ITestConfig>('test');
  const dbConfig = configService.get<IDatabaseConfig>('database');

  console.log(dbConfig);

  /* SWAGGER */
  const config = new DocumentBuilder()
    .setTitle('NestJS example')
    .setDescription('The NestJS example API description')
    .setVersion('1.0')
    // .addTag('cats')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-swagger', app, document);

  await app.listen(appConfig.port);
  console.log('server running on port: ' + appConfig.port);
  console.log('server running app: ' + appConfig.appName);
  console.log('Aplication name: ' + testConfig.name);
  console.log('Aplication version: ' + testConfig.version);
}
bootstrap();
