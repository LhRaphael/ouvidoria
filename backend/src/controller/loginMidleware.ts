import { UsuarioController } from "./usuarioController";
import { AdminController } from "./adminController";
import { PedidoController } from "./pedidoController";

const usuarioController = new UsuarioController();
const pedidoController = new PedidoController();

export class LoginMiddleware {
    async validateLogin(email: string, password: string) {
        try {
            const usuario = await usuarioController.verifyCredentials(email, password);
            
            const dataUsuario = {
                class: "user",
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email
            };
            return dataUsuario;
        } catch (error) {
            throw error;
        }
    }

    async validateAdminLogin(email: string, password: string) {
        try { 
            const adminController = new AdminController();
            const admin = await adminController.getAdminByCredentials(email, password);
            const dataAdmin = {
                class: "admin",
                id: admin.id,
                nome: admin.nome,
                email: admin.email,
                cargo: admin.cargo,
                cpf: admin.cpf,
                instituicao: admin.instituicaoId,
            };
            return dataAdmin;
        } catch (error) {
            throw error;
        }
    }

    async middleware(email: string, password: string) {
        try {
            const user = await this.validateLogin(email, password);
            if(user){
                return user;
            }
            throw new Error("Invalid credentials");
        } catch (error) {

            try {
                const admin = await this.validateAdminLogin(email, password);
                const verificar = await pedidoController.getByCpf(admin.cpf);
                console.log(verificar); 

                if(verificar){
                    throw new Error("Usuário com pedido pendente");
                }

                // só vai retornar o admin se ele não tiver um pedido associado
                if(admin){
                    return admin;
                }

                throw new Error("Invalid credentials");
            } catch (adminError) {
                throw adminError;
            }
        }
    }
}