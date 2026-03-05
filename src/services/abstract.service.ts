import type { Transaction } from "sequelize";
import { withTransaction } from "../utils/conditionalTransaction";
import { logger } from "../utils/logger";

class AbstractService<T> {
    protected repository: any;
    protected entityName: string;

    constructor(repository: any, entityName: string) {
        this.repository = repository;
        this.entityName = entityName;
    }

    async create(data: T, transaction?: Transaction, actorUserId?: number): Promise<T> {
        const created = await withTransaction<T>((tx) => this.repository.create(data, tx), transaction);
        const createdId = (created as { id?: number }).id;
        if (createdId !== undefined) {
            logger.info({ entity: this.entityName, id: createdId, actorUserId }, `${this.entityName} created`);
        }
        return created;
    }

    async findAll(transaction?: Transaction): Promise<T[]> {
        const items = await this.repository.findAll(transaction);
        logger.info({ entity: this.entityName, count: items.length }, `${this.entityName} list`);
        return items;
    }

    async findById(id: number, transaction?: Transaction): Promise<T | null> {
        const item = await this.repository.findById(id, transaction);
        if (item) {
            logger.info({ entity: this.entityName, id }, `${this.entityName} found`);
        } else {
            logger.info({ entity: this.entityName, id }, `${this.entityName} not found`);
        }
        return item;
    }

    async update(id: number, data: Partial<T>, transaction?: Transaction, actorUserId?: number): Promise<T | null> {
        const updated = await withTransaction<T | null>((tx) => this.repository.update(id, data, tx), transaction);
        if (updated) {
            logger.info({ entity: this.entityName, id, actorUserId }, `${this.entityName} updated`);
        } else {
            logger.info({ entity: this.entityName, id, actorUserId }, `${this.entityName} not found`);
        }
        return updated;
    }

    async delete(id: number, transaction?: Transaction, actorUserId?: number): Promise<boolean> {
        const deleted = await withTransaction<boolean>((tx) => this.repository.delete(id, tx), transaction);
        if (deleted) {
            logger.info({ entity: this.entityName, id, actorUserId }, `${this.entityName} deleted`);
        } else {
            logger.info({ entity: this.entityName, id, actorUserId }, `${this.entityName} not found`);
        }
        return deleted;
    }
}

export default AbstractService;
