import type { Transaction } from "sequelize";

class AbstractRepository<T> {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }

    async create(data: Partial<T>, transaction?: Transaction): Promise<T> {
        const instance = await this.model.create(data, { transaction });
        return instance.toJSON() as T;
    }

    async findById(id: number, transaction?: Transaction): Promise<T | null> {
        const instance = await this.model.findByPk(id, { transaction });
        return instance ? (instance.toJSON() as T) : null;
    }

    async findAll(transaction?: Transaction): Promise<T[]> {
        const instances = await this.model.findAll({ transaction });
        return instances.map((instance: any) => instance.toJSON() as T);
    }

    async update(id: number, data: Partial<T>, transaction?: Transaction): Promise<T | null> {
        const [updatedRows] = await this.model.update(data, { where: { id }, transaction });
        if (updatedRows > 0) {
            return this.findById(id, transaction);
        }
        return null;
    }

    async delete(id: number, transaction?: Transaction): Promise<boolean> {
        const deletedRows = await this.model.destroy({ where: { id }, transaction });
        return deletedRows > 0;
    }
}

export default AbstractRepository;
