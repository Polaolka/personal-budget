FROM node:18-alpine

# Встановлюємо робочу директорію
WORKDIR /usr/src/app

# Копіюємо файли package.json та package-lock.json
COPY package*.json ./

# Встановлюємо залежності
RUN npm install

# Копіюємо інші файли проекту
COPY . .

# Копіюємо скрипт wait-for-it.sh
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh

# Робимо скрипт виконуваним
RUN chmod +x /usr/src/app/wait-for-it.sh

# Встановлюємо postgresql-client для використання pg_isready
RUN apk add --no-cache postgresql-client

# Відкриваємо порт 7000
EXPOSE 7000

# Використовуємо скрипт wait-for-it.sh для очікування готовності бази
CMD ["sh", "-c", "./wait-for-it.sh postgres 5432 -- npm run start:dev"]
