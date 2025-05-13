FROM node:18-alpine

WORKDIR /app

COPY package.json tsconfig.json ./
COPY src ./src
COPY prisma ./prisma

RUN npm install
RUN npm install -g ts-node-dev

EXPOSE 3000
CMD ["ts-node-dev", "src/main.ts"]
