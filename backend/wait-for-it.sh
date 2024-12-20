#!/bin/sh
set -e  # Зупинити виконання скрипта, якщо будь-яка команда завершиться з кодом помилки

TIMEOUT=60  # Максимальний час очікування доступності сервісу в секундах
HOST="$1"  # Перший аргумент: хост бази даних
PORT="$2"  # Другий аргумент: порт бази даних
shift 2  # Зміщуємо список аргументів, щоб $@ містив лише основну команду (після "--")
USERNAME="${DATABASE_USERNAME:-postgres}"  # Використовуємо змінну середовища або значення за замовчуванням
DATABASE="${DATABASE_NAME:-personal_budget}"  # Те ж саме для бази даних

echo "Waiting for $HOST:$PORT to be ready..."  # Інформуємо, що починається очікування
echo "Using USERNAME: $USERNAME and DATABASE: $DATABASE"  # Логування змінних середовища

for i in $(seq $TIMEOUT); do  # Цикл, який повторюється $TIMEOUT разів (від 1 до TIMEOUT)
  echo "Attempt $i/$TIMEOUT: Checking connection..."  # Логування номера спроби
  if pg_isready -h "$HOST" -p "$PORT" -U "$USERNAME" -d "$DATABASE"; then  # Перевіряємо доступність бази даних
    echo "Service $HOST:$PORT is ready!"  # Якщо база готова, логування повідомлення
    echo "Executing command: $@"  # Виводимо основну команду, яку будемо виконувати
    exec "$@"  # Виконуємо основну команду, передану після "--"
    exit 0  # Завершуємо скрипт з кодом успішного виконання
  else
    echo "pg_isready failed on attempt $i. Retrying..."  # Якщо `pg_isready` не вдається, логування помилки
  fi
  sleep 1  # Чекаємо 1 секунду перед наступною спробою
done

echo "Timeout reached: $HOST:$PORT is not ready."  # Якщо цикл завершився, і база не готова, виводимо повідомлення
exit 1  # Завершуємо скрипт з кодом помилки









# #!/bin/sh
# set -e

# TIMEOUT=60
# HOST="$1"
# PORT="$2"
# shift 2 # Забираємо перші два аргументи, залишаючи команду в $@
# USERNAME="${DATABASE_USERNAME:-postgres}"
# DATABASE="${DATABASE_NAME:-personal_budget}"

# echo "Waiting for $HOST:$PORT to be ready..."
# echo "Using USERNAME: $USERNAME and DATABASE: $DATABASE"

# for i in $(seq $TIMEOUT); do
#   echo "Attempt $i/$TIMEOUT: Checking connection..."
#   if pg_isready -h "$HOST" -p "$PORT" -U "$USERNAME" -d "$DATABASE"; then
#     echo "Service $HOST:$PORT is ready!"
#     echo "Executing command: $@"
#     exec "$@" # Виконання основної команди
#     exit 0
#   else
#     echo "pg_isready failed on attempt $i. Error code: $?"
#   fi
#   sleep 1
# done

# echo "Timeout reached: $HOST:$PORT is not ready."
# exit 1
