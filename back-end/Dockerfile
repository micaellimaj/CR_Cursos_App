# Imagem base
FROM node:18

# Diretório de trabalho no container
WORKDIR /app

# Copia os arquivos
COPY package*.json ./
RUN npm install

# Copia o restante do código
COPY . .

# Cria pasta de uploads se não existir
RUN mkdir -p uploads

# Expõe a porta da aplicação
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["node", "server.js"]
