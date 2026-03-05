import type { Request, Response } from "express";
import type { ZodType } from "zod";

class AbstractController<TCreate, TUpdate> {
    protected service: any;
    protected createSchema: ZodType<TCreate>;
    protected updateSchema: ZodType<TUpdate>;

    constructor(service: any, createSchema: ZodType<TCreate>, updateSchema: ZodType<TUpdate>) {
        this.service = service;
        this.createSchema = createSchema;
        this.updateSchema = updateSchema;
    }

    async create(req: Request, res: Response) {
        const payload = this.createSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: payload.error.flatten()
            });
        }

        const created = await this.service.create(payload.data, undefined, req.user?.id);
        return res.status(201).json(created);
    }

    async findAllOrById(req: Request, res: Response) {
        const queryId = req.query.id;
        if (queryId === undefined) {
            const items = await this.service.findAll();
            return res.json(items);
        }

        const rawId = Array.isArray(queryId) ? queryId[0] : queryId;
        if (typeof rawId !== "string") {
            return res.status(400).json({ message: "Invalid id" });
        }

        const id = Number(rawId);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const item = await this.service.findById(id);
        if (!item) {
            return res.status(404).json({ message: "Not found" });
        }

        return res.json(item);
    }

    async update(req: Request, res: Response) {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const payload = this.updateSchema.safeParse(req.body);
        if (!payload.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: payload.error.flatten()
            });
        }

        const updated = await this.service.update(id, payload.data, undefined, req.user?.id);
        if (!updated) {
            return res.status(404).json({ message: "Not found" });
        }

        return res.json(updated);
    }

    async delete(req: Request, res: Response) {
        const id = Number(req.params.id);
        if (!Number.isInteger(id)) {
            return res.status(400).json({ message: "Invalid id" });
        }

        const deleted = await this.service.delete(id, undefined, req.user?.id);
        if (!deleted) {
            return res.status(404).json({ message: "Not found" });
        }

        return res.status(204).send();
    }
}

export default AbstractController;
