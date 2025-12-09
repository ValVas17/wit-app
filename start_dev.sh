#!/bin/bash

FRONTEND_DIR="./wit-app-front"
BACKEND_DIR="./wit-app-back"

cleanup_on_exit() {
    echo "--- Initiating cleanup: Stopping services and freeing ports ---"

    # пытаемся убить процессы, которые мы запустили, по их PID.
    if [ -n "$FRONTEND_PID" ]; then
        echo "Killing frontend (PID $FRONTEND_PID)..."
        kill -9 "$FRONTEND_PID" 2>/dev/null || true
    fi
    if [ -n "$BACKEND_PID" ]; then
        echo "Killing backend (PID $BACKEND_PID)..."
        kill -9 "$BACKEND_PID" 2>/dev/null || true
    fi

    # ищем и убиваем любые процессы, висящие на нужных портах.
    echo "Ensuring ports 3000 and 8080 are free..."
    sudo kill -9 $(sudo lsof -ti:8080 2>/dev/null) 2>/dev/null || true
    sudo kill -9 $(sudo lsof -ti:3000 2>/dev/null) 2>/dev/null || true
    echo "Cleanup complete. Ports 3000 and 8080 should now be free."
    exit 0
}

trap cleanup_on_exit SIGINT

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

echo "One of the services terminated unexpectedly. Performing cleanup..."
cleanup_on_exit
