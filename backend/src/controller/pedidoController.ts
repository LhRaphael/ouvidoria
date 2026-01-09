import { PedidoService } from "../service/pedidoService";
const pedidoService = new PedidoService();

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

    async getAll() {
        try {
            const pedidos = await pedidoService.findAll();
            return pedidos;
        } catch (error) {
            throw error;
        }
    }

    async delete(id: String) {
        try {
            await pedidoService.delete(Number(id));
        } catch (error) {
            throw error;
        }
    }
}