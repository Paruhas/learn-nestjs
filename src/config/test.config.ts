import { registerAs } from '@nestjs/config';
import { ITestConfig } from './interface/test-config.interface';

export const TestConfig = registerAs<ITestConfig>('test', () => {
  return {
    name: 'NestJS',
    version: '1.0.0',
  };
});

export default TestConfig;
