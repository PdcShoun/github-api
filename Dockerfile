FROM node:20-alpine AS base

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

#
FROM base AS builder

WORKDIR /usr/src/app

RUN npm run build

#
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 8000

CMD ["node", "./dist/index.js"]
