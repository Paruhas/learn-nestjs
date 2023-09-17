import { ConfigService, registerAs } from '@nestjs/config';
import { IDatabaseConfig } from './interface/database-config.interface';
import { TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

export const DBConfig = registerAs<IDatabaseConfig>('database', () => {
  return {
    // type: 'mssql',
    // host: 'localhost',
    // port: 1443,
    // database: 'learn-nestjs',
    // username: 'root',
    // password: '1234',
    // schema: 'learn-nestjs',
    // autoEntities: true,
    // synchronization: false,
    // options: {
    //   trustServiceCertificate: true,
    // },

    type: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'learn-nestjs',
    username: 'root',
    password: 'admin1234',
  };
});

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions() {
    return this.configService.get<IDatabaseConfig>('database');
  }
}

export default DBConfig;
