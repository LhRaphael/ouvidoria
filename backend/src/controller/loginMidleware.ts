import { UsuarioController } from "./usuarioController";
import { AdminController } from "./adminController";

const usuarioController = new UsuarioController();

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
                email: admin.email
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
            const admin = await this.validateAdminLogin(email, password);
            if(admin){
                return admin;
            }
            throw new Error("Invalid credentials");
        } catch (error) {
            throw error;
        }
    }
}