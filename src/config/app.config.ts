import { registerAs } from '@nestjs/config';
import { IAppConfig } from './interface/app-config.interface';

export const AppConfig = registerAs<IAppConfig>('app', () => {
  return {
    port: parseInt(process.env.APP_PORT) || 4000,
    appName: process.env.APP_NAME || '',
  };
});

export default AppConfig;
