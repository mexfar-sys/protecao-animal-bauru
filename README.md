# 🐾 Proteção Animal Bauru

Sistema de proteção e bem-estar animal desenvolvido para a cidade de Bauru.

## 📋 Descrição do Projeto

Este projeto é uma aplicação web completa com backend em Node.js/Express e frontend em React/TypeScript, destinada a gerenciar informações sobre animais, abusos, e ações de proteção animal.

## 🏗️ Estrutura do Projeto

```
protecao-animal-bauru/
├── backend/           # Servidor API (Express + TypeScript)
├── frontend/          # Cliente web (React + TypeScript)
├── README.md         # Este arquivo
└── .github/          # Workflows GitHub Actions
```

## 🚀 Quick Start

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- PostgreSQL 13+
- Docker (opcional)

### Instalação

#### 1. Clone o repositório

```bash
git clone https://github.com/mexfar-sys/protecao-animal-bauru.git
cd protecao-animal-bauru
```

#### 2. Backend

```bash
cd backend

# Copiar variáveis de ambiente
cp .env.example .env

# Instalar dependências
npm install

# Executar migrations (se aplicável)
npm run migrate

# Iniciar em desenvolvimento
npm run dev
```

#### 3. Frontend

```bash
cd frontend

# Copiar variáveis de ambiente
cp .env.example .env

# Instalar dependências
npm install

# Iniciar em desenvolvimento
npm run dev
```

A aplicação estará disponível em:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## 🐳 Docker

```bash
cd backend
docker-compose up
```

## 📚 Documentação

- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🔐 Autenticação

O projeto utiliza JWT (JSON Web Tokens) para autenticação:

1. Registrar novo usuário: `POST /api/auth/register`
2. Fazer login: `POST /api/auth/login`
3. Obter usuário atual: `GET /api/auth/me` (requer token)

**Token Format**: `Authorization: Bearer <token>`

## 📝 API Endpoints

### Autenticação

- `POST /api/auth/register` - Registrar novo usuário
- `POST /api/auth/login` - Fazer login
- `GET /api/auth/me` - Obter dados do usuário (autenticado)
- `POST /api/auth/logout` - Fazer logout

### Health Check

- `GET /health` - Status do servidor

## 🧪 Testes

### Backend

```bash
cd backend
npm run test
```

### Frontend

```bash
cd frontend
npm run test
```

## 🛠️ Desenvolvimento

### Commits

Seguir padrão Conventional Commits:

```
feat: adiciona nova funcionalidade
fix: corrige bug
docs: documentação
style: formatação
test: testes
refactor: refatoração de código
```

### Code Style

- TypeScript strict mode
- ESLint para linting
- Prettier para formatação

## 📦 Dependências Principais

### Backend
- Express.js
- PostgreSQL
- JWT
- Prisma ORM
- Jest (testes)

### Frontend
- React 18+
- React Router
- Axios
- Vite
- Vitest (testes)

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feat/sua-feature`
2. Commit suas mudanças: `git commit -m 'feat: descrição'`
3. Push para a branch: `git push origin feat/sua-feature`
4. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT.

## ✉️ Contato

Para dúvidas ou sugestões, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para os animais de Bauru**
