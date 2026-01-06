import { UsuarioService } from "../service/usuarioService";

const usuarioService = new UsuarioService();

export class UsuarioController {
    async getById(id: string) {
        try{
            const usuario = await usuarioService.findById(id);
            return usuario;
        }
        catch(error){
            throw error;
        }   
    }
    
    async getByEmail(email: string) {
        try{
            const usuario = await usuarioService.findByEmail(email);
            return usuario;
        }
        catch(error){
            throw error;
        }   
    }

    async create(data: { 
        nome: string; 
        cpf: string; 
        email: string; 
        telefone: string; 
        nascimento: Date; 
        endereco: string; 
        senha: string 
    }) {
        try{
            const usuario = await usuarioService.create(data);
            return usuario;
        }
        catch(error){
            throw error;
        }   
    }
    async verifyCredentials(email: string, password: string) {
        try{
            const usuario = await usuarioService.verifyCredentials(email, password);
            return usuario;
        }
        catch(error){
            throw error;
        }   
    }   
}