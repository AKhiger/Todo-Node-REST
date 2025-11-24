export class PrismaService {
    constructor(prismaClient) {
        this.prisma = prismaClient;
    }

    async create(model, data) {
        try {
            return await this.prisma[model].create({
                data
            });
        } catch (error) {
            throw new Error(`Create operation failed: ${error.message}`);
        }
    }

    async readAll(model, options = {}) {
        try {
            return await this.prisma[model].findMany(options);
        } catch (error) {
            throw new Error(`Read operation failed: ${error.message}`);
        }
    }
    async readOne(model, options = {}) {
        try {
            return await this.prisma[model].findUnique(options);
        } catch (error) {
            throw new Error(`Read operation failed: ${error.message}`);
        }
    }

    async update(model, where, data) {
        try {
            return await this.prisma[model].update({
                where,
                data
            });
        } catch (error) {
            throw new Error(`Update operation failed: ${error.message}`);
        }
    }

    async delete(model, where) {
        try {
            return await this.prisma[model].delete({
                where
            });
        } catch (error) {
            throw new Error(`Delete operation failed: ${error.message}`);
        }
    }
}