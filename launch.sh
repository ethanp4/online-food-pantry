#!/bin/bash

mysqld_safe --skip-grant-tables &

sleep 1

DB_EXISTS=$(mysql -u root -e "SHOW DATABASES LIKE 'food';" | grep "food")

if [ -z "$DB_EXISTS" ]; then
  echo "Database doesnt exist. Running create_sample_database.sql"
  mysql -u root < sql/create_sample_database.sql
fi

npm start --prefix backend &
npm run preview --prefix frontend -- --host 0.0.0.0 &
wait