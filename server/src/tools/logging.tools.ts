import { logger } from '../server';

export function infoLogger(context: string, message?: string) {
  if (!message)
    return function call(message: string) {
      return logger.info(`[${context}] ${message}`);
    };

  return logger.info(`[${context}] ${message}`);
}

export function debugLogger(context: string, message?: string) {
  if (!message)
    return function call(message: string) {
      return logger.debug(`[${context}] ${message}`);
    };

  return logger.debug(`[${context}] ${message}`);
}

export function warnLogger(context: string, message?: string) {
  if (!message)
    return function call(message: string) {
      return logger.warn(`[${context}] ${message}`);
    };

  return logger.warn(`[${context}] ${message}`);
}

export function errorLogger(context: string, message: string): void;

export function errorLogger(context: string): (message: string) => void;

export function errorLogger(context: string, message?: string) {
  if (!message)
    return function call(message: string) {
      return logger.error(`[${context}] ${message}`);
    };

  return logger.error(`[${context}] ${message}`);
}
