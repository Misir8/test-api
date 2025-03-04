import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Глобальная валидация
  app.useGlobalPipes(new ValidationPipe());

  // Настройка Swagger
  const config = new DocumentBuilder()
    .setTitle('Управление задачами API')
    .setDescription(
      'API для управления пользователями и их задачами с авторизацией и логированием',
    )
    .setVersion('1.0')
    .addTag('auth', 'Аутентификация')
    .addTag('tasks', 'Управление задачами')
    .addTag('log', 'Логирование и статистика')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000);
  console.log(`Приложение запущено на порту ${process.env.PORT || 3000}`);
  console.log(
    `Документация Swagger доступна по адресу: http://localhost:${process.env.PORT || 3000}/api`,
  );
}
bootstrap();