FROM node:22-alpine AS builder
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .

FROM node:22-alpine
WORKDIR /usr/src/app

RUN addgroup -S node && adduser -S node -G node

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package.json ./
COPY --from=builder /usr/src/app/src ./src

RUN chown -R node:node /usr/src/app

USER node


EXPOSE 3001
CMD [ "npm", "start" ]
