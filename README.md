<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).

# API управления задачами

API для управления пользователями и их задачами с авторизацией и логированием.

## Технологии

- NestJS
- TypeORM
- PostgreSQL
- TypeScript
- JWT для аутентификации
- bcrypt для хеширования паролей
- class-validator для валидации данных
- Swagger для документации API

## Установка и запуск

### Предварительные требования

- Node.js (версия 14 или выше)
- npm или yarn
- Docker и Docker Compose (для запуска PostgreSQL)

### Шаги по установке

1. Клонировать репозиторий:
```bash
git clone https://github.com/yourusername/task-management-api.git
cd task-management-api
```

2. Установить зависимости:
```bash
npm install
```

3. Запустить PostgreSQL с помощью Docker Compose:
```bash
docker-compose up -d
```

4. Запустить приложение:
```bash
npm run start:dev
```

5. Открыть документацию Swagger:
```
http://localhost:3005/api
```

## API Endpoints

### Аутентификация

- `POST /auth/register` - Регистрация пользователя
- `POST /auth/login` - Вход в систему (получение JWT токена)

### Задачи

- `POST /tasks` - Создать задачу (требуется JWT)
- `GET /users/:id/tasks` - Получить задачи пользователя (требуется JWT)
- `PATCH /tasks/:id` - Обновить статус задачи (требуется JWT)
- `DELETE /tasks/:id` - Удалить задачу (требуется JWT)

### Логирование

- `GET /log/total/:user_id` - Получить сумму очков задач пользователя по статусам (требуется JWT)
- `GET /log/range/:user_id/:start_date/:end_date` - Получить сумму очков задач пользователя по статусам за период (требуется JWT)

## Документация API

Полная документация API доступна через Swagger UI по адресу:
```
http://localhost:3005/api
```

## Остановка и очистка

Для остановки базы данных:
```bash
docker-compose down
```

Для остановки и удаления всех данных:
```bash
docker-compose down -v
```
