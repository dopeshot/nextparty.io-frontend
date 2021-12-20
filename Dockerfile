FROM node:16 AS dev

EXPOSE 3000

FROM node:16 AS full
WORKDIR /usr/src/app

#copy package.json and package-lock.json
COPY package*.json ./

#install dependencies
RUN npm install

#copy source
COPY . .

FROM full as depl

CMD ["npm", "run", "start"] 