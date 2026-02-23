package com.wit.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.*;

@RestController
@RequestMapping("/documentation")
public class ApiDocumentationController {

    @GetMapping
    public Map<String, Object> getApiDocumentation() {
        Map<String, Object> doc = new LinkedHashMap<>();
        doc.put("apiName", "Wit Learning Platform API");
        doc.put("version", "1.0");
        doc.put("baseUrl", "http://localhost:8080/api");
        doc.put("description", "API для приложения English With Wit");

        List<Map<String, Object>> endpoints = new ArrayList<>();

        // ========== AUTH ==========

        // 1. GET /auth/check
        endpoints.add(createEndpoint(
                "GET", "/auth/check",
                "Проверка работоспособности сервера аутентификации",
                null,
                "Auth API работает! ✅",
                null
        ));

        // 2. POST /auth/register
        Map<String, String> registerRequest = new LinkedHashMap<>();
        registerRequest.put("login", "string (3-50 символов, обязательное)");
        registerRequest.put("email", "string (валидный email, обязательное)");
        registerRequest.put("password", "string (минимум 6 символов, обязательное)");

        Map<String, Object> registerResponse = new LinkedHashMap<>();
        registerResponse.put("success", true);
        registerResponse.put("message", "Регистрация успешна");
        registerResponse.put("token", "JWT токен");
        Map<String, Object> registerUser = new LinkedHashMap<>();
        registerUser.put("id", "integer");
        registerUser.put("login", "string");
        registerUser.put("email", "string");
        registerUser.put("levelId", "integer или null");
        registerResponse.put("user", registerUser);

        Map<String, String> registerErrors = new LinkedHashMap<>();
        registerErrors.put("400", "Пользователь с таким логином/email уже существует");

        endpoints.add(createEndpoint(
                "POST", "/auth/register",
                "Регистрация нового пользователя",
                registerRequest,
                registerResponse,
                registerErrors
        ));

        // 3. POST /auth/login
        Map<String, String> loginRequest = new LinkedHashMap<>();
        loginRequest.put("loginOrEmail", "string (логин или email, обязательное)");
        loginRequest.put("password", "string (обязательное)");

        Map<String, Object> loginResponse = new LinkedHashMap<>();
        loginResponse.put("success", true);
        loginResponse.put("message", "Вход выполнен успешно");
        loginResponse.put("token", "JWT токен");
        Map<String, Object> loginUser = new LinkedHashMap<>();
        loginUser.put("id", "integer");
        loginUser.put("login", "string");
        loginUser.put("email", "string");
        loginUser.put("levelId", "integer или null");
        loginResponse.put("user", loginUser);

        Map<String, String> loginErrors = new LinkedHashMap<>();
        loginErrors.put("401", "Неверный пароль");
        loginErrors.put("404", "Пользователь не найден");

        endpoints.add(createEndpoint(
                "POST", "/auth/login",
                "Вход в систему",
                loginRequest,
                loginResponse,
                loginErrors
        ));

        // 4. POST /auth/validate
        Map<String, String> validateRequest = new LinkedHashMap<>();
        validateRequest.put("token", "string (JWT токен)");

        Map<String, Object> validateResponse = new LinkedHashMap<>();
        validateResponse.put("success", true);
        validateResponse.put("message", "Токен валиден");
        validateResponse.put("token", "string");
        Map<String, Object> validateUser = new LinkedHashMap<>();
        validateUser.put("id", "integer");
        validateUser.put("login", "string");
        validateUser.put("email", "string");
        validateUser.put("levelId", "integer или null");
        validateResponse.put("user", validateUser);

        Map<String, String> validateErrors = new LinkedHashMap<>();
        validateErrors.put("401", "Токен недействителен");

        endpoints.add(createEndpoint(
                "POST", "/auth/validate",
                "Валидация JWT токена",
                validateRequest,
                validateResponse,
                validateErrors
        ));

        // ========== PASSWORD RESET ==========

        // 5. POST /auth/password/request-reset
        Map<String, String> requestResetRequest = new LinkedHashMap<>();
        requestResetRequest.put("email", "string (обязательное)");

        Map<String, String> requestResetErrors = new LinkedHashMap<>();
        requestResetErrors.put("400", "Пользователь с таким email не найден");

        endpoints.add(createEndpoint(
                "POST", "/auth/password/request-reset",
                "Запрос сброса пароля (отправляет email с токеном)",
                requestResetRequest,
                "Инструкции по восстановлению пароля отправлены на email",
                requestResetErrors
        ));

        // 6. POST /auth/password/reset
        Map<String, String> resetRequest = new LinkedHashMap<>();
        resetRequest.put("token", "string (токен из email)");
        resetRequest.put("newPassword", "string (минимум 6 символов)");

        Map<String, String> resetErrors = new LinkedHashMap<>();
        resetErrors.put("400", "Недействительный или просроченный токен");

        endpoints.add(createEndpoint(
                "POST", "/auth/password/reset",
                "Сброс пароля с использованием токена",
                resetRequest,
                "Пароль успешно изменен",
                resetErrors
        ));

        // ========== LESSONS ==========

        // 7. GET /lessons
        // Создаём пример навыка
        Map<String, Object> skill1 = new LinkedHashMap<>();
        skill1.put("id", 2);
        skill1.put("name", "Vocabulary");
        Map<String, Object> skill2 = new LinkedHashMap<>();
        skill2.put("id", 4);
        skill2.put("name", "Speaking");
        List<Map<String, Object>> skillsExample = Arrays.asList(skill1, skill2);

        Map<String, Object> lessonExample = new LinkedHashMap<>();
        lessonExample.put("id", 1);
        lessonExample.put("number", 1);
        lessonExample.put("levelId", 1);
        lessonExample.put("title", "Acquaintance");
        lessonExample.put("description", "Описание урока");
        lessonExample.put("imgSrc", null);
        lessonExample.put("sortOrder", 1);
        lessonExample.put("createdAt", "2025-11-29T19:57:12.03616");
        lessonExample.put("updatedAt", "2025-11-29T19:57:12.03616");
        lessonExample.put("skills", skillsExample);

        List<Map<String, Object>> allLessonsExample = Collections.singletonList(lessonExample);

        endpoints.add(createEndpoint(
                "GET", "/lessons",
                "Получить все уроки (с навыками, отсортированные по sortOrder)",
                null,
                allLessonsExample,
                null
        ));

        // 8. GET /lessons/{id}
        Map<String, String> lessonByIdParams = new LinkedHashMap<>();
        lessonByIdParams.put("id", "integer (path parameter)");

        Map<String, Object> lessonByIdExample = new LinkedHashMap<>();
        lessonByIdExample.put("id", 1);
        lessonByIdExample.put("number", 1);
        lessonByIdExample.put("levelId", 1);
        lessonByIdExample.put("title", "Acquaintance");
        lessonByIdExample.put("description", "...");
        lessonByIdExample.put("imgSrc", null);
        lessonByIdExample.put("sortOrder", 1);
        lessonByIdExample.put("createdAt", "2025-11-29T19:57:12.03616");
        lessonByIdExample.put("updatedAt", "2025-11-29T19:57:12.03616");
        lessonByIdExample.put("skills", skillsExample);

        Map<String, String> lessonByIdErrors = new LinkedHashMap<>();
        lessonByIdErrors.put("404", "Урок не найден");

        endpoints.add(createEndpoint(
                "GET", "/lessons/{id}",
                "Получить урок по ID",
                lessonByIdParams,
                lessonByIdExample,
                lessonByIdErrors
        ));

        doc.put("endpoints", endpoints);
        return doc;
    }

    private Map<String, Object> createEndpoint(String method, String path, String description,
                                                Object requestBody, Object responseExample,
                                                Map<String, String> errorResponses) {
        Map<String, Object> endpoint = new LinkedHashMap<>();
        endpoint.put("method", method);
        endpoint.put("path", "/api" + path);
        endpoint.put("description", description);
        if (requestBody != null) {
            endpoint.put("requestBody", requestBody);
        }
        if (responseExample != null) {
            endpoint.put("responseExample", responseExample);
        }
        if (errorResponses != null && !errorResponses.isEmpty()) {
            endpoint.put("errorResponses", errorResponses);
        }
        return endpoint;
    }
}