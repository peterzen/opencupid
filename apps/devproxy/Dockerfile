FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5174

CMD ["npx", "browser-sync", "start", "--config", "browsersync.cjs"]
