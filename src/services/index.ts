import { PrismaClient } from "@prisma/client";

export class PrismaService {
    private prisma: PrismaClient;

    constructor(prismaClient: PrismaClient) {
        this.prisma = prismaClient;
    }

    async create<T>(model: string, data: T): Promise<T> {
        try {
            return await (this.prisma[model as keyof PrismaClient] as any).create({
                data,
            });
        } catch (error: any) {
            throw new Error(`Create operation failed for model '${model}': ${error.message}`);
        }
    }

    async readAll<T>(model: string, options: Record<string, any> = {}): Promise<T[]> {
        try {
            return await (this.prisma[model as keyof PrismaClient] as any).findMany(options);
        } catch (error: any) {
            throw new Error(`Read operation failed for model '${model}': ${error.message}`);
        }
    }

    async readOne<T>(model: string, options: Record<string, any>): Promise<T | null> {
        try {
            return await (this.prisma[model as keyof PrismaClient] as any).findUnique(options);
        } catch (error: any) {
            throw new Error(`Read operation failed for model '${model}': ${error.message}`);
        }
    }

    async update<T>(
        model: string,
        where: Record<string, any>,
        data: Record<string, any>
    ): Promise<T> {
        try {
            return await (this.prisma[model as keyof PrismaClient] as any).update({
                where,
                data,
            });
        } catch (error: any) {
            throw new Error(`Update operation failed for model '${model}': ${error.message}`);
        }
    }

    async delete<T>(
        model: string,
        where: Record<string, any>
    ): Promise<T> {
        try {
            return await (this.prisma[model as keyof PrismaClient] as any).delete({
                where,
            });
        } catch (error: any) {
            throw new Error(`Delete operation failed for model '${model}': ${error.message}`);
        }
    }

    async count(model: string, where?: Record<string, any>): Promise<number> {
        try {
            return await (this.prisma[model as keyof PrismaClient] as any).count({
                where,
            });
        } catch (error: any) {
            throw new Error(`Count operation failed for model '${model}': ${error.message}`);
        }
    }

    async upsert<T>(
        model: string,
        where: Record<string, any>,
        create: Record<string, any>,
        update: Record<string, any>
    ): Promise<T> {
        try {
            return await (this.prisma[model as keyof PrismaClient] as any).upsert({
                where,
                create,
                update,
            });
        } catch (error: any) {
            throw new Error(`Upsert operation failed for model '${model}': ${error.message}`);
        }
    }
}