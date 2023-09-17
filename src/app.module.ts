import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import AppConfig from './config/app.config';
import TestConfig from './config/test.config';
import DBConfig, { DatabaseConfig } from './config/databas.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { IDatabaseConfig } from './config/interface/database-config.interface';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [AppConfig, TestConfig, DBConfig],
    }),

    // /* CLASS CONNECT */
    // TypeOrmModule.forRootAsync({
    //   imports: [NestConfigModule],
    //   useClass: DatabaseConfig,
    // }),

    // // /* FACTORY CONNECT */
    // TypeOrmModule.forRootAsync({
    //   useFactory: (configService: ConfigService) => {
    //     return configService.get<IDatabaseConfig>('database');
    //   },
    //   inject: [ConfigService],
    // }),

    /* MANUAL CONFIG */
    // TypeOrmModule.forRoot({
    //   type: 'mssql',
    //   host: 'localhost',
    //   port: 1443,
    //   database: 'nestjs',
    //   username: '',
    //   password: '',
    //   entities: [],
    //   synchronize: true,
    // }),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      database: 'learn-nestjs',
      username: 'root',
      password: 'admin1234',
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
