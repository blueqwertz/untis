FROM node:19

WORKDIR /app

COPY client ./client
WORKDIR /app/client
RUN npm install
RUN npm run build

WORKDIR /app

COPY server ./server
WORKDIR /app/server
RUN npm install

EXPOSE 3000

CMD ["npm", "start"]

