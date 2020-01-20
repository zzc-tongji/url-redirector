FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./
COPY index.js ./
RUN npm ci --only=production

CMD [ "node", "index.js" ]
