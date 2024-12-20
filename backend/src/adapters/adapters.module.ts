import { Module } from '@nestjs/common';
import { HttpAdapter } from './http.adapter';
import { EnvConfigModule } from '@config/env/env-config.module';

@Module({
  imports: [EnvConfigModule],
  providers: [HttpAdapter],
  exports: [HttpAdapter],
})
export class AdaptersModule {}
