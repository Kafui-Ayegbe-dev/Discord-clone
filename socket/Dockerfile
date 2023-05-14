FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

WORKDIR /app/socket

RUN npm install socket.io

WORKDIR /app

CMD ["npm", "start"]
