
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
COPY . .

# Expõe porta do Apollo Server
EXPOSE 4000

# Variáveis de ambiente (opcional, já que você usa .env)
ENV NODE_ENV=production

# Comando para rodar seu app diretamente
CMD ["node", "src/server.js"]
