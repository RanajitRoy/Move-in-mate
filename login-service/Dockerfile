FROM node:18

COPY package*.json ./

RUN npm install

COPY server.js ./

EXPOSE 3001

ENTRYPOINT [ "node", "server.js" ]