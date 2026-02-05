class AbstractRepository<T> {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }

    async create(data: Partial<T>): Promise<T> {
        const instance = await this.model.create(data);
        return instance.toJSON() as T;
    }

    async findById(id: number): Promise<T | null> {
        const instance = await this.model.findByPk(id);
        return instance ? (instance.toJSON() as T) : null;
    }

    async findAll(): Promise<T[]> {
        const instances = await this.model.findAll();
        return instances.map((instance: any) => instance.toJSON() as T);
    }

    async update(id: number, data: Partial<T>): Promise<boolean> {
        const [updatedRows] = await this.model.update(data, { where: { id } });
        return updatedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const deletedRows = await this.model.destroy({ where: { id } });
        return deletedRows > 0;
    }
}

export default AbstractRepository;