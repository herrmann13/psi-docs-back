# Project Rules for Agents

This file defines the shared rules all agents must follow when implementing changes in this repository.

## Transaction Policy

- Transactions are always started in the service layer.
- Repositories never create transactions.
- Services must wrap mutating operations with `withTransaction` from `src/utils/conditionalTransaction.ts`.
- Repositories must accept an optional `Transaction` parameter and pass it to Sequelize operations.

## Service/Repository Contract

- Services call repositories using the optional `transaction` parameter.
- Repositories expose CRUD methods that accept the transaction and do not return Sequelize instances.
- Updates return the updated entity object or `null` when not found.
- Deletes return `boolean`.

## Implementation Notes

- Prefer reusing `AbstractService` and `AbstractRepository`.
- Ensure new entities have matching model, repository, and service.

## DTOs and Controllers

- DTOs live in `src/dtos`, one file per entity.
- Each entity has two DTOs: `EntityCreate` and `EntityUpdate` (replace `Entity` with the entity name).
- `Create` DTO fields are required; `Update` DTO fields are optional.
- DTOs use Zod schemas for runtime validation, and controllers must validate requests with these schemas.
- Controllers are class-based and inherit from `AbstractController`.
- Controllers expose CRUD handlers and must be used by routes.

## Routes

- Each entity has its own route file in `src/routes` (example: `patient.route.ts`).
- Routes must be authenticated with `authMiddleware`.
- GET routes must be a single `/` endpoint that uses query param `id` to decide `findById`; when absent, use `findAll`.
- `src/server.ts` mounts routes with an entity-specific prefix.
