FROM node:15

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./server /app/server

EXPOSE 5002

CMD ["npm", "run", "dev"]