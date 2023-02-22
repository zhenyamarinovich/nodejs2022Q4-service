FROM node:18-alpine

WORKDIR /app

COPY package*.json .

RUN apk add --update python3 make g++\
    && rm -rf /var/cache/apk/*

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]