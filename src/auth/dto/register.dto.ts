import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Иван Иванов', description: 'Имя пользователя' })
  @IsNotEmpty({ message: 'Имя не может быть пустым' })
  name: string;

  @ApiProperty({
    example: 'ivan@example.com',
    description: 'Email пользователя',
  })
  @IsEmail({}, { message: 'Некорректный email' })
  email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль пользователя (минимум 6 символов)',
  })
  @MinLength(6, { message: 'Пароль должен содержать минимум 6 символов' })
  password: string;
}
