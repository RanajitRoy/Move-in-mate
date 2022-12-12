FROM node:18

COPY package*.json ./

RUN npm install

COPY server.js ./

EXPOSE 6001

ENTRYPOINT [ "node", "server.js" ]