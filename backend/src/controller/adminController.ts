import { AdminService } from "../service/adminService";

const adminService = new AdminService();

export class AdminController {
    async getAdminById(id: string) {
        try {
            const admin = await adminService.findById(Number(id));
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async getAdminByCredentials(email: string, password: string) {  
        try {
            const admin = await adminService.verifyCredentials(email, password);
            if(!admin){
                throw new Error("Invalid credentials");
            }
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async getAdminByEmail(email: string) {
        try {
            const admin = await adminService.findByEmail(email);
            return admin;
        } catch (error) {
            throw error;
        }
    }

    async getAllAdmins() {
        try {
            const admins = await adminService.findAll();
            return admins;
        } catch (error) {
            throw error;
        }
    }
    async createAdmin(
        data: {
            nome: string;
            cpf: string;
            email: string;
            senha: string;
            cargo: string;
            instituicaoCnpj: string;
        }
    ) {
        try {
            const admin = await adminService.create(data);
            return admin;
        } catch (error) {
            throw error;
        }
    }   

}