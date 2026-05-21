# 🐳 Guia Docker e Containerização

## O que é Docker?

Docker permite empacotar a aplicação e suas dependências em um **container**, garantindo que funcione da mesma forma em qualquer máquina.

## 📦 Instalação

### Windows/Mac

1. Baixe [Docker Desktop](https://www.docker.com/products/docker-desktop)
2. Instale e inicie
3. Verifique: `docker --version`

### Linux

```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
sudo usermod -aG docker $USER
```

## 🚀 Desenvolvimento com Docker

### Usando Docker Compose (Recomendado)

```bash
cd backend
docker-compose up -d
```

Isso inicia:
- PostgreSQL (porta 5432)
- Backend (porta 3000)

Ver logs:
```bash
docker-compose logs -f backend
docker-compose logs -f postgres
```

Parar:
```bash
docker-compose down
```

## 📝 Dockerfile Explicado

### Backend

```dockerfile
# 1. Imagem base com Node.js
FROM node:18-alpine

# 2. Diretório de trabalho no container
WORKDIR /app

# 3. Copiar arquivos de dependência
COPY package*.json ./

# 4. Instalar dependências
RUN npm install

# 5. Copiar código-fonte
COPY . .

# 6. Build do TypeScript
RUN npm run build

# 7. Expor porta
EXPOSE 3000

# 8. Comando para iniciar
CMD ["npm", "start"]
```

### Frontend

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

**nginx.conf:**
```nginx
server {
    listen 80;
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
}
```

## 🔧 Docker Compose

### Desenvolvimento

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    container_name: protecao_animal_db
    environment:
      POSTGRES_USER: protecao_user
      POSTGRES_PASSWORD: protecao_password
      POSTGRES_DB: protecao_animal
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U protecao_user"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: protecao_animal_api
    environment:
      NODE_ENV: development
      PORT: 3000
      DATABASE_URL: postgresql://protecao_user:protecao_password@postgres:5432/protecao_animal
      JWT_SECRET: dev_secret_key
    ports:
      - "3000:3000"
    depends_on:
      postgres:
        condition: service_healthy
    volumes:
      - ./backend/src:/app/src
    command: npm run dev

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: protecao_animal_web
    environment:
      VITE_API_URL: http://localhost:3000/api
    ports:
      - "5173:5173"
    depends_on:
      - backend
    volumes:
      - ./frontend/src:/app/src

volumes:
  postgres_data:
```

### Produção

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: ${DB_NAME}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${DB_USER}"]
      interval: 10s

  backend:
    image: seu-registro/protecao-animal-api:latest
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/${DB_NAME}
      JWT_SECRET: ${JWT_SECRET}
    depends_on:
      postgres:
        condition: service_healthy
    restart: always
    labels:
      - "com.example.description=API Backend"

  frontend:
    image: seu-registro/protecao-animal-web:latest
    ports:
      - "80:80"
    restart: always
    labels:
      - "com.example.description=Frontend Web"

  nginx:
    image: nginx:alpine
    ports:
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./certs:/etc/nginx/certs
    depends_on:
      - backend
      - frontend
    restart: always

volumes:
  postgres_data:
```

## 🔨 Comandos Docker

### Build

```bash
# Build imagem
docker build -t protecao-animal-api:latest .

# Build com BuildKit (mais rápido)
DOCKER_BUILDKIT=1 docker build -t protecao-animal-api:latest .

# Build com tag
docker build -t seu-usuario/protecao-animal:1.0.0 .
```

### Executar

```bash
# Run container
docker run -p 3000:3000 protecao-animal-api:latest

# Run com variáveis
docker run -e NODE_ENV=production protecao-animal-api:latest

# Run interativo
docker run -it protecao-animal-api:latest /bin/sh

# Run com volumes (para desenvolvimento)
docker run -v $(pwd):/app -p 3000:3000 protecao-animal-api:latest
```

### Gerenciar

```bash
# Listar containers
docker ps           # Em execução
docker ps -a        # Todos

# Listar imagens
docker images

# Ver logs
docker logs <container_id>
docker logs -f <container_id>  # Follow

# Parar container
docker stop <container_id>

# Remover container
docker rm <container_id>

# Remover imagem
docker rmi <image_id>

# Executar comando em container rodando
docker exec -it <container_id> /bin/sh
```

## 🚀 Docker Hub

### Publicar imagem

```bash
# Login
docker login

# Tag
docker tag protecao-animal-api:latest seu-usuario/protecao-animal-api:latest

# Push
docker push seu-usuario/protecao-animal-api:latest

# Pull (em outro lugar)
docker pull seu-usuario/protecao-animal-api:latest
```

## 📊 Docker Networks

```bash
# Criar rede
docker network create protecao-network

# Conectar container
docker run --network protecao-network ...

# Inspecionar
docker network inspect protecao-network
```

## 💾 Volumes

```bash
# Criar volume
docker volume create protecao-data

# Listar
docker volume ls

# Remover
docker volume rm protecao-data

# Usar em container
docker run -v protecao-data:/data ...
```

## 🚨 Troubleshooting

### Erro: "Cannot connect to Docker daemon"

```bash
# Inicie Docker Desktop ou daemon
sudo systemctl start docker  # Linux

# Verifique permissões
sudo usermod -aG docker $USER
newgrp docker
```

### Erro: "Port already in use"

```bash
# Encontre processo na porta
lsof -i :3000

# Ou mude a porta
docker run -p 3001:3000 ...
```

### Container não inicia

```bash
# Ver logs
docker logs <container_id>

# Verificar health status
docker inspect <container_id>
```

### Build lento

```bash
# Use .dockerignore
echo "node_modules" >> .dockerignore
echo ".git" >> .dockerignore

# Use cache de layers
docker build --no-cache -t protecao-animal-api:latest .
```

## ✅ Best Practices

### Dockerfile

```dockerfile
# ✅ CORRETO
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci  # Melhor que npm install
COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production
USER node  # Não rodar como root
CMD ["node", "dist/server.js"]

# ❌ EVITE
FROM ubuntu:latest  # Muito grande
RUN apt-get install node  # Lento
COPY . /app
RUN npm install
USER root
```

### docker-compose.yml

```yaml
# ✅ CORRETO
services:
  app:
    build: .
    restart: always
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
    depends_on:
      db:
        condition: service_healthy
    environment:
      NODE_ENV: ${NODE_ENV}

# ❌ EVITE
services:
  app:
    image: node:latest  # Versão fixa recomendada
    restart: no  # Use always
    ports:
      - "3000:80"  # Expor portas desnecessárias
```

## 📖 Recursos

- [Docker Docs](https://docs.docker.com/)
- [Docker Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Docker Compose Docs](https://docs.docker.com/compose/)
