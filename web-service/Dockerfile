FROM node:18 as build 

WORKDIR /react-app

COPY package*.json .

RUN npm install

RUN npm install -g serve

COPY . .

RUN npm run build

CMD ["serve", "-s", "build", "-l", "tcp://0.0.0.0:80"]