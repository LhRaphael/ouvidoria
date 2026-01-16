import { PedidoService } from "../service/pedidoService";
import { AdminService } from "../service/adminService";

const pedidoService = new PedidoService();
const adminService = new AdminService()

export class PedidoController {
    async create(data: { 
        adminCPF: string; 
        instituicaoCNPJ: string;
    }) {
        try {
            console.log(data);
            const pedido = await pedidoService.create(data);
            return pedido;
        } catch (error) {
            throw error;
        }
    }

    async getById(id: number) {
        try {
            const pedido = await pedidoService.findById(id);
            return pedido;
        } catch (error) {
            throw error;
        }
    }

    async getByCpf(cpf: string) {
        try {
            const pedido = await pedidoService.findByCpf(cpf);
            return pedido;
        } catch (error) {
            throw error;
        }
    }

    async getByCnpj(cnpj: string) {
        try {
            const pedido = await pedidoService.findAllByCnpj(cnpj);
            return pedido;
        } catch (error) {
            throw error;
        }
    }

    async getSimpleByCnpj(cnpj:string){
        try {
            const pedidos = await pedidoService.findAllByCnpj(cnpj);

            const promises = pedidos.map((p) => adminService.findByCpf(p.adminCPF));

            const adminsEncontrados = await Promise.all(promises);

            const data = adminsEncontrados
                .filter(admin => admin !== null) 
                .map((admin) => ({
                    nome: admin.nome,
                    email: admin.email,
                    cpf: admin.cpf
                }));

            return data;

        } catch (error) {
            throw error;
        }
    }

    async getAll() {
        try {
            const pedidos = await pedidoService.findAll();
            return pedidos;
        } catch (error) {
            throw error;
        }
    }

    async delete(cpf: string) {
        try {
            await pedidoService.delete(cpf);
        } catch (error) {
            throw error;
        }
    }
}