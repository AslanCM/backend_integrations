FROM node:22-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./

COPY libs ./libs

COPY customers-api ./customers-api

RUN npm install

FROM node:22-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/libs ./libs
COPY --from=builder /usr/src/app/customers-api ./customers-api

WORKDIR /usr/src/app/customers-api

RUN adduser -D nonroot

USER nonroot

EXPOSE 3001
CMD [ "npm", "start" ]
