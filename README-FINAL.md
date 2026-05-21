# 🐾 Proteção Animal Bauru - Aplicativo Completo

[![CI/CD](https://github.com/mexfar-sys/protecao-animal-bauru/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/mexfar-sys/protecao-animal-bauru/actions/workflows/ci-cd.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Node.js](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![React](https://img.shields.io/badge/react-18.2.0-blue)
![TypeScript](https://img.shields.io/badge/typescript-5.2.2-blue)

## 📖 Sobre

Sistema completo de proteção e bem-estar animal para a cidade de Bauru, com backend robusto em Node.js/Express e frontend moderno em React.

## 🎯 Funcionalidades

### ✅ Backend
- 🔐 Autenticação com JWT
- 🗄️ Banco de dados PostgreSQL
- 🧪 Testes automatizados com Jest
- 📝 API REST documentada
- 🐳 Docker e Docker Compose

### ✅ Frontend
- ⚛️ React 18 com TypeScript
- 🚀 Vite como bundler
- 🧪 Testes com Vitest
- 📱 Interface responsiva
- 🔄 Integração com API

### ✅ DevOps
- 🔄 CI/CD com GitHub Actions
- 🔍 ESLint e Prettier
- 📊 Code coverage
- 🚀 Deploy automático

## 🚀 Quick Start

### Opção 1: Setup Automático

```bash
# Linux/Mac
bash setup.sh

# Windows
call setup.bat
```

### Opção 2: Setup Manual

**Backend:**
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

**Frontend (novo terminal):**
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

### Acesso

- 🌐 Frontend: http://localhost:5173
- 🔌 Backend: http://localhost:3000
- 📚 API Docs: http://localhost:3000/api

## 📚 Documentação

| Documento | Descrição |
|-----------|-----------|
| [📦 INSTALLATION.md](./INSTALLATION.md) | Guia completo de instalação |
| [🚀 DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy em produção (Vercel, AWS, etc) |
| [🛠️ DEVELOPMENT.md](./DEVELOPMENT.md) | Guia de desenvolvimento |
| [🐳 DOCKER.md](./DOCKER.md) | Docker e containerização |
| [🤝 CONTRIBUTING.md](./CONTRIBUTING.md) | Como contribuir |
| [🔐 SECURITY.md](./SECURITY.md) | Políticas de segurança |
| [📋 CHANGELOG.md](./CHANGELOG.md) | Histórico de versões |

### Documentação Específica

- [Backend Installation](./backend/INSTALLATION.md)
- [Frontend Installation](./frontend/INSTALLATION.md)
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

## 🛠️ Stack Tecnológico

### Backend
- **Node.js** 18+
- **Express.js** - Framework web
- **TypeScript** - Tipagem estática
- **PostgreSQL** - Banco de dados
- **Prisma** - ORM
- **JWT** - Autenticação
- **Jest** - Testes

### Frontend
- **React** 18 - UI library
- **TypeScript** - Tipagem
- **Vite** - Build tool
- **Axios** - HTTP client
- **React Router** - Roteamento
- **Vitest** - Testes

### DevOps
- **Docker** - Containerização
- **GitHub Actions** - CI/CD
- **PostgreSQL** - Banco de dados
- **Nginx** - Reverse proxy

## 📋 Estrutura do Projeto

```
protecao-animal-bauru/
├── backend/              # API REST
│   ├── src/
│   ├── tests/
│   ├── package.json
│   └── docker-compose.yml
├── frontend/             # Interface Web
│   ├── src/
│   ├── tests/
│   └── package.json
├── .github/
│   ├── workflows/        # CI/CD
│   └── ISSUE_TEMPLATE/   # Templates
├── docs/                 # Documentação
└── scripts/              # Utilitários
```

## 🔐 Segurança

- ✅ JWT com expiração
- ✅ Senha com hash (bcrypt)
- ✅ CORS configurado
- ✅ Rate limiting
- ✅ SQL injection prevenido
- ✅ Variáveis sensíveis em `.env`
- ✅ Logs sem dados sensíveis

Veja [SECURITY.md](./SECURITY.md) para detalhes.

## 🧪 Testes

```bash
# Todos os testes
npm run test

# Backend
npm run test:backend

# Frontend
npm run test:frontend

# Com cobertura
npm run test -- --coverage
```

## 📊 Scripts Disponíveis

```bash
# Setup
npm run setup              # Setup automático (Linux/Mac)
npm run setup:win          # Setup automático (Windows)

# Desenvolvimento
npm run dev                # Backend + Frontend
npm run dev:backend        # Apenas Backend
npm run dev:frontend       # Apenas Frontend

# Build
npm run build              # Backend + Frontend
npm run build:backend      # Apenas Backend
npm run build:frontend     # Apenas Frontend

# Testes
npm run test               # Todos os testes
npm run test:backend       # Backend
npm run test:frontend      # Frontend

# Linting
npm run lint               # Backend + Frontend
npm run lint:backend       # Apenas Backend
npm run lint:frontend      # Apenas Frontend

# Formatação
npm run format             # Formatar código

# Docker
npm run docker:build       # Build das imagens
npm run docker:up          # Iniciar containers
npm run docker:down        # Parar containers
npm run docker:logs        # Ver logs
```

## 🚀 Deployment

### Vercel (Frontend)

```bash
vercel login
cd frontend
vercel deploy --prod
```

### Railway (Backend)

```bash
railway login
railway up --service api
```

### Docker

```bash
docker-compose -f docker-compose.prod.yml up -d
```

Veja [DEPLOYMENT.md](./DEPLOYMENT.md) para mais opções.

## 🔄 GitHub Workflow

1. **Fork** o repositório
2. **Clone**: `git clone https://github.com/seu-usuario/protecao-animal-bauru.git`
3. **Branch**: `git checkout -b feat/sua-feature`
4. **Commit**: `git commit -m "feat: descrição"`
5. **Push**: `git push origin feat/sua-feature`
6. **PR**: Abra um Pull Request

Veja [CONTRIBUTING.md](./CONTRIBUTING.md) para detalhes.

## 📝 Git Commits

Seguir [Conventional Commits](https://www.conventionalcommits.org/):

```bash
feat:  adiciona nova funcionalidade
fix:   corrige bug
docs:  documentação
test:  testes
refactor: refatoração
chore: tarefas de manutenção
```

## 🐛 Reportar Bugs

1. Abra uma [Issue](https://github.com/mexfar-sys/protecao-animal-bauru/issues)
2. Use o template de bug report
3. Descreva passos para reproduzir
4. Indique ambiente (SO, Node version, etc)

## 💡 Sugerir Melhorias

1. Abra uma [Discussion](https://github.com/mexfar-sys/protecao-animal-bauru/discussions)
2. Descreva a ideia
3. Discuta com a comunidade

## 📞 Contato

- 📧 Email: mexfar@gmail.com
- 🐙 GitHub: [@mexfar-sys](https://github.com/mexfar-sys)

## 📄 Licença

MIT License - veja [LICENSE](LICENSE) para detalhes.

## 🙏 Agradecimentos

Obrigado a todos que contribuem para este projeto!

---

**Desenvolvido com ❤️ para os animais de Bauru**

## ⭐ Se gostou, deixe uma estrela!

[![Star on GitHub](https://img.shields.io/github/stars/mexfar-sys/protecao-animal-bauru?style=social)](https://github.com/mexfar-sys/protecao-animal-bauru)
