# Swagger

Documentacao interativa disponivel em `GET /docs`.

Dependencias:
- `swagger-jsdoc`
- `swagger-ui-express`

Definicao gerada em `src/docs/swagger.ts`.

Login:
- `POST /auth/google` com `{ "idToken": "..." }` para obter JWT interno.
