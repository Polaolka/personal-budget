import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggerService } from '@common/logger/logger.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggerService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const now = Date.now();

    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    this.logger.log(
      `Incoming Request on ${request.path}`,
      `method=${request.method}`,
    );

    return next.handle().pipe(
      tap(() => {
        this.logger.log(
          `End Request for ${request.path}`,
          `method=${request.method} | duration=${Date.now() - now}ms`,
        );
      }),
    );
  }
}
