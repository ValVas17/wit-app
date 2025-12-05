#!/bin/bash

FRONTEND_DIR="./wit-app-front"
BACKEND_DIR="./wit-app-back"

# --- Запуск бэкенда в фоновом режиме ---
echo "Starting Spring Boot backend..."
cd "$BACKEND_DIR" || { echo "Error: Backend directory not found!"; exit 1; }
# 'mvn clean install' - можно добавить, если нужно пересобрать проект перед запуском
# 'mvn clean install spring-boot:run' - если нужен и install
mvn spring-boot:run &
BACKEND_PID=$!        # Сохраняем PID бэкенда, чтобы потом его можно было убить
cd - > /dev/null      # Возвращаемся в исходную директорию скрипта

echo "Waiting 2 seconds for backend to start..."
sleep 2

# --- Запуск фронтенда в фоновом режиме ---
echo "Starting React frontend..."
cd "$FRONTEND_DIR" || { echo "Error: Frontend directory not found!"; exit 1; }
npm run start &
FRONTEND_PID=$! # Сохраняем PID фронтенда
cd - > /dev/null # Возвращаемся в исходную директорию скрипта

echo "----------------------------------------"
echo "Both frontend (PID $FRONTEND_PID) and backend (PID $BACKEND_PID) are starting."
echo "They are available at http://localhost:3000 and http://localhost:8080"
echo "To stop both, press Ctrl+C or run 'kill $FRONTEND_PID $BACKEND_PID'"
echo "----------------------------------------"

# Ждём Ctrl+C
wait -n $FRONTEND_PID $BACKEND_PID
