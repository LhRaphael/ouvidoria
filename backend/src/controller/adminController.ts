import { AdminService } from "../service/adminService";
import { PedidoService } from "../service/pedidoService";

const adminService = new AdminService();
const pedidoService = new PedidoService();

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

    async deletAdmin(cpf: string){
        try{
            const admin = await adminService.delete(cpf)
            return admin
        }
        catch(error){
            throw error
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
            const funcionarios = await adminService.findAllByCnpj(data.instituicaoCnpj);
            console.log(funcionarios.length)
            if(funcionarios.length > 1){
                //ele vai pra tabela de pedidos
                data.cargo = "PENDENTE";
                const pedidoData = {
                    adminCPF: data.cpf,
                    instituicaoCNPJ: data.instituicaoCnpj
                }
                await pedidoService.create(pedidoData);
            }
            
            console.log(data);
            return admin;
        } catch (error) {
            throw error;
        }
    }   

    async getAllAdminsByCnpj(cnpj: string) {
        try {
            const admins = await adminService.findAllByCnpj(cnpj);
            return admins;
        } catch (error) {
            throw error;
        }
    }

    async update(data:{id:number, cargo:string}){
        try{
            const admin = await adminService.updateCargo(data)
            return admin;
        }catch(error){
            throw error
        }
        
    }

}