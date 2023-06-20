FROM node:alpine

WORKDIR /server/app

COPY . .

RUN npm install

ENV NODE_ENV production

COPY package*.json ./

EXPOSE 5000

RUN npm run build

CMD ["node", "dist/js/app.js"]
