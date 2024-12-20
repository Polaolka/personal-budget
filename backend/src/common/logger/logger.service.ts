import { Injectable, Logger, Scope } from '@nestjs/common';
import chalk from 'chalk';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService extends Logger {
  debug(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      super.debug(chalk.gray(`[DEBUG]: ${message}`), context);
    }
  }

  log(context: string, message: string) {
    super.log(chalk.blueBright(`[INFO]: ${message}`), context);
  }

  error(context: string, message: string) {
    super.error(chalk.red(`[ERROR]: ${message}`), context);
  }

  warn(context: string, message: string) {
    super.warn(chalk.bgYellowBright.black(`[WARN]: ${message}`), context);
  }

  verbose(context: string, message: string) {
    if (process.env.NODE_ENV !== 'production') {
      super.verbose(chalk.cyan(`[VERBOSE]: ${message}`), context);
    }
  }
}
