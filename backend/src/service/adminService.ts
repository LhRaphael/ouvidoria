import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword } from "../lib/bycript";

export class AdminService {
    async findById(id: number) {
        const admin = await prisma.admin.findUnique({
            where: {
                id,
            },
        });

        return admin;
    }

    async findAll() {
        const admins = await prisma.admin.findMany();
        return admins;
    }

    async findByEmail(email: string) {
        const admin = await prisma.admin.findUnique({
            where: {
                email,
            },
        });

        return admin;
    }

    async delete(id: number) {
        await prisma.admin.delete({
            where: {
                id,
            },
        });
    }

    async create(
        data: {
            nome: string;
            cpf: string;
            email: string;
            senha: string;
            cargo: string;
            instituicaoCnpj: string;
        }
    ) {
        const hashedPassword = await hashPassword(data.senha);
        
        const admin = {
            nome: data.nome,
            cpf: data.cpf,
            email: data.email,
            senhaHash: hashedPassword,
            cargo: data.cargo,
            instituicaoCNPJ: data.instituicaoCnpj,
        }

        const atual = await prisma.admin.create({
            data: admin,
        });

        return atual;
    }

    async verifyCredentials(email: string, password: string) {
        const admin = await prisma.admin.findUnique({
            where: {
                email,
            },
        });

        if (!admin) {
            return null;
        }

        const isPasswordValid = await verifyPassword(password, admin.senhaHash);

        if (!isPasswordValid) {
            return null;
        }

        return admin;
    }
}