import { prisma } from "../lib/prisma";
import { hashPassword, verifyPassword } from "../lib/bycript";

export class UsuarioService {
  async findById(id: number) {
    return await prisma.usuario.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string) {
    return await prisma.usuario.findUnique({
      where: { email },
    });
  }

  async create(
    data: { 
        nome: string; 
        cpf: string; 
        email: string; 
        telefone: string; 
        nascimento: Date; 
        endereco: string; 
        senha: string 
    }) {

    const usuario = {
        nome: data.nome,
        cpf: data.cpf,
        email: data.email,
        telefone: data.telefone,
        nascimento: data.nascimento,
        senhaHash: await hashPassword(data.senha),
    }

    const atual = await prisma.usuario.create({
      data: usuario,
    });

    const endereco = data.endereco.split(',').map(item => item.trim());

    await prisma.endereco.create({
      data: {
        pais: String(endereco[0]),
        estado: String(endereco[1]),
        cidade: String(endereco[2]),
        usuarioId: atual.id,
      },
    });

    return atual;
  }
    async verifyCredentials(email: string, password: string) {
    const usuario = await this.findByEmail(email);
    if (!usuario) {
      return null;
    }

    const isValid = await verifyPassword(password, usuario.senhaHash);
    if (!isValid) {
      return null;
    }

    return usuario;
  }
}