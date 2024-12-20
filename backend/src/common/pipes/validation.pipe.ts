import { ValidationException } from '@common/exceptions/validation.exceptions';
import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform {
  async transform(
    value: unknown,
    metadata: ArgumentMetadata,
  ): Promise<unknown> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);
    console.log(errors);
    if (errors.length) {
      const messages = errors.map(
        (err) =>
          `${err.property} - ${Object.values(err.constraints).join(', ')}`,
      );
      throw new ValidationException(messages);
    }
    return value;
  }
}
