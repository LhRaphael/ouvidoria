# Sistema de Ouvidoria

Este projeto consiste numa plataforma completa de Ouvidoria, desenhada para facilitar a comunicação entre cidadãos (utilizadores) e instituições. O sistema permite o registo de manifestações (reclamações, sugestões, etc.), gestão por parte de administradores e integração com Inteligência Artificial para resumo de conteúdos.

## 🛠 Tecnologias Utilizadas

O projeto está estruturado como um monorrepositório contendo o *frontend* e o *backend*.

### Backend
O servidor foi desenvolvido em **Node.js** com **TypeScript**, utilizando as seguintes tecnologias principais:
* **Framework Web:** Express
* **Base de Dados:** PostgreSQL gerido pelo **Prisma ORM**
* **Autenticação:** Bcrypt.js
* **Inteligência Artificial:** Integração com o Google Generative AI (Gemini)

### Frontend
A interface do utilizador foi construída com **React**, utilizando:
* **Routing:** React Router Dom
* **Markdown:** React Markdown (para renderização de texto formatado)
* **Estilos/Utilitários:** Web Vitals e scripts padrão do Create React App

## 📋 Pré-requisitos

Antes de iniciar, certifique-se de que tem instalado na sua máquina:
* [Node.js](https://nodejs.org/)
* [PostgreSQL](https://www.postgresql.org/)
* Gestor de pacotes `npm`

## 🚀 Instalação e Configuração

### 1. Clonar o repositório e instalar pacotes
```bash
git clone <url-do-repositorio>
cd ouvidoria
cd backend
npm install
cd ..
cd frontend
npm install
```
### Configuração de Ambiente 
(.env): Crie um ficheiro .env na pasta backend com as variáveis necessárias (exemplo):

DATABASE_URL="postgresql://user:password@localhost:5432/ouvidoria_db?schema=public"

# Adicione a chave da API do Google se for utilizar as funcionalidades de IA
GEMINI_API_KEY="sua_chave_aqui"

###Execute as migrações do Prisma para criar as tabelas:
npx prisma migrate dev

execute ./init.sh no linux
ou 

cd backend
npm run dev

cd frontend
npm start
