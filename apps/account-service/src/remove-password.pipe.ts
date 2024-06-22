import { PipeTransform, Injectable } from '@nestjs/common';

@Injectable()
export class RemovePasswordPipe implements PipeTransform {
  transform(value: any) {
    if (value && value.password) {
      const dataWithoutPassword = { ...value };
      delete dataWithoutPassword.password;
      return dataWithoutPassword;
    }
    return value;
  }
}
