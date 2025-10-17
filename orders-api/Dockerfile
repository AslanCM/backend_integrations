FROM node:22-alpine AS builder
WORKDIR /usr/src/app

COPY package*.json ./

COPY libs ./libs

COPY customers-api ./customers-api
COPY orders-api ./orders-api

RUN npm install

FROM node:22-alpine
WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/libs ./libs
COPY --from=builder /usr/src/app/customers-api ./customers-api
COPY --from=builder /usr/src/app/orders-api ./orders-api

WORKDIR /usr/src/app/customers-api
WORKDIR /usr/src/app/orders-api

RUN adduser -D nonroot

USER nonroot

EXPOSE 3002
CMD [ "npm", "start" ]
