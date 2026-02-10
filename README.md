# Fastify Production-Ready API POC

A demonstration of a modern, production-ready Node.js API built with the Fastify framework. This project showcases best practices, high-performance features, and a scalable architecture.

## 🚀 Features

-   **Modular Architecture**: Automatic plugin and route loading using `@fastify/autoload`.
-   **Strict Validation**: Input validation and output serialization using JSON Schema (powered by AJV).
-   **API Documentation**: Interactive Swagger/OpenAPI documentation auto-generated from schemas.
-   **Environment Management**: Strict environment variable validation on startup using `@fastify/env`.
-   **Error Handling**: Centralized, standardized error management with `@fastify/sensible`.
-   **Observability**: High-performance logging with Pino and structured JSON outputs.
-   **Security**: Pre-configured CORS, standardized security headers, and rate limiting to prevent brute-force/DDoS attacks.
-   **Rate Limiting**: Integrated `@fastify/rate-limit` with custom error responses.
-   **Testing**: Comprehensive integration tests using `tap` and `fastify.inject()`.
-   **Code Quality**: Integrated ESLint with a modern flat configuration for consistent code style and error prevention.

## 📂 Project Structure

```text
├── src/
│   ├── app.js            # Fastify App factory (Plugin/Route registration)
│   ├── server.js         # Entry point (Server startup & Graceful shutdown)
│   ├── plugins/         # Global plugins (cors, env, swagger, rate-limit, error-handler)
│   ├── routes/          # API Route handlers (organized by resource)
│   └── schemas/         # Shared JSON schemas for validation/serialization
├── test/                # Integration and Unit tests
├── .env                 # Environment configuration
├── eslint.config.js     # Code quality rules
└── package.json         # Scripts and dependencies
```

## 🛠️ Getting Started

### Prerequisites

-   Node.js v20.x or higher
-   npm v10.x or higher

### Installation

```bash
npm install
```

### Running the Application

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

### API Documentation

Once the server is running, visit the interactive Swagger UI:
-   [http://localhost:3000/documentation](http://localhost:3000/documentation)

### Running Tests

```bash
npm test
```

### Linting

**Check code quality:**
```bash
npm run lint
```

**Fix lint issues automatically:**
```bash
npm run lint:fix
```

## 🧪 API Endpoints Demonstrated

| Method | Endpoint      | Description                          |
| :----- | :------------ | :----------------------------------- |
| GET    | `/health`     | Simple health check                  |
| GET    | `/users`      | List all users                       |
| POST   | `/users`      | Create a new user (with validation)  |
| GET    | `/users/:id`  | Get user details (UUID validation)   |
| DELETE | `/users/:id`  | Delete a user                        |

## 🛡️ Production Best Practices Included

1.  **Graceful Shutdown**: Handles `SIGINT` and `SIGTERM` to close database connections and finish pending requests.
2.  **Serialization**: Schemas are used to ensure that only defined properties are sent to the client, preventing accidental data leaks.
3.  **Startup Validation**: The application will fail fast if required environment variables are missing.
4.  **Logging**: Contextual identifiers (like `reqId`) are automatically included in logs for request tracing.
5.  **Standard Errors**: Every error response follows the same structure, making it easier for frontend integration.
6.  **Static Analysis**: ESLint is configured to catch common bugs and enforce a consistent "clean code" standard across the team.
