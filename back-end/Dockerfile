# Imagem base
FROM node:18-slim

# Diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Garante que o diretório de uploads exista
RUN mkdir -p /app/uploads

# Expõe a porta da aplicação
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
