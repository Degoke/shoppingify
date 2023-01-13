import { LogLevel } from '@nestjs/common';

function getLogLevels(isProduction: boolean): LogLevel[] {
  if (isProduction) {
    return ['log', 'warn', 'error'];
  }
  return ['error', 'warn', 'debug', 'log', 'verbose'];
}

export default getLogLevels;
