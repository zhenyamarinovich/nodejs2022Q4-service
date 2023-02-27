import { LoggerService as LoggerInterface, LogLevel } from '@nestjs/common';
import * as process from 'process';

import { appendFileSync, mkdirSync, statSync, renameSync } from 'node:fs';
import { dirname, join, parse } from 'node:path';

const LOG_FILE_MAX_SIZE = parseInt(process.env.LOG_FILE_SIZE) || 10;
const LOG_LEVELS = ['error', 'warn', 'log', 'verbose', 'debug'];
const LOG_LEVEL = process.env.LOG_LEVEL || undefined;

const PATH = './logs';
const FILE_LOG_NAME = 'log.txt';
const FILE_LOG_ERROR_NAME = 'error-log.txt';

export class LoggingService implements LoggerInterface {
  private currentLevel: number;

  constructor() {
    if (LOG_LEVELS.includes(LOG_LEVEL)) {
      this.currentLevel = LOG_LEVELS.indexOf(LOG_LEVEL);
    } else {
      this.currentLevel = LOG_LEVELS.indexOf('debug');
    }
  }

  debug(message) {
    this.writeLog('debug', message);
  }

  error(message) {
    this.writeLog('error', message);
  }

  log(message) {
    this.writeLog('log', message);
  }

  verbose(message) {
    this.writeLog('verbose', message);
  }

  warn(message) {
    this.writeLog('warn', message);
  }

  logResponse(
    statusCode: number,
    responseBody: string | object | undefined,
  ): any {
    let responseBodyString = 'N/A';

    if (typeof responseBody === 'string') {
      responseBodyString = responseBody;
    } else if (typeof responseBody === 'object') {
      responseBodyString = JSON.stringify(responseBody);
    }

    this.log(`Response: Status code ${statusCode}; Body ${responseBodyString}`);
  }

  private writeToFile(level: LogLevel, formatLine: string) {
    const fileName = level === 'error' ? FILE_LOG_ERROR_NAME : FILE_LOG_NAME;
    const filePath = join(PATH, fileName);
    const dirName = dirname(filePath);

    try {
      const stats = statSync(filePath);

      const fileSize = stats.size / 1024;

      if (fileSize > LOG_FILE_MAX_SIZE) {
        renameSync(
          filePath,
          join(dirName, `${parse(fileName)}${Date.now()}.txt}`),
        );
      }
    } catch (error) {
      console.log(error);
    }

    mkdirSync(dirName, { recursive: true });
    appendFileSync(filePath, formatLine);
  }

  private writeLog(level: LogLevel, message) {
    if (LOG_LEVELS.indexOf(level) > this.currentLevel) {
      return;
    }

    const formatLine = `${level.toUpperCase()} --> ${message} \n`;

    process.stdout.write(formatLine);

    this.writeToFile(level, formatLine);
  }
}
