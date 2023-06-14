FROM node:latest

ENV NODE_ENV production

WORKDIR /server/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

RUN npm run build

CMD ["node", "dist/js/app.js"]