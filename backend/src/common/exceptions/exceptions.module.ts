import { Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';

@Module({
  imports: [],
  providers: [ExceptionsService],
  exports: [ExceptionsService],
})
export class ExceptionsModule {}
