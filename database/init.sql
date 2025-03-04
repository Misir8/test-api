-- Создание типов перечислений
CREATE TYPE task_status_enum AS ENUM ('created', 'progress', 'hold', 'done');
CREATE TYPE log_task_status_enum AS ENUM ('created', 'progress', 'hold', 'done');

-- Создание таблицы пользователей
CREATE TABLE "user" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы задач
CREATE TABLE task (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  status task_status_enum DEFAULT 'created',
  "createdAt" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание таблицы логов
CREATE TABLE log (
  id SERIAL PRIMARY KEY,
  "userId" INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  "taskId" INTEGER NOT NULL REFERENCES task(id) ON DELETE CASCADE,
  points INTEGER NOT NULL,
  "logTaskStatus" log_task_status_enum NOT NULL,
  timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индексов для оптимизации запросов
CREATE INDEX idx_task_user_id ON task("userId");
CREATE INDEX idx_log_user_id ON log("userId");
CREATE INDEX idx_log_task_id ON log("taskId");
CREATE INDEX idx_log_timestamp ON log(timestamp); 