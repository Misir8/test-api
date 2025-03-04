import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({ example: 'Разработка API', description: 'Заголовок задачи' })
  @IsNotEmpty({ message: 'Заголовок не может быть пустым' })
  @IsString({ message: 'Заголовок должен быть строкой' })
  @MaxLength(100, { message: 'Заголовок не может быть длиннее 100 символов' })
  title: string;

  @ApiProperty({
    example: 'Разработать REST API для управления задачами',
    description: 'Описание задачи',
  })
  @IsNotEmpty({ message: 'Описание не может быть пустым' })
  @IsString({ message: 'Описание должно быть строкой' })
  description: string;
}
