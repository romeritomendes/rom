FROM node:current-alpine

RUN mkdir -p /home/node/app/node_modules
RUN chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./package.json ./

USER node

RUN npm install

COPY --chown=node:node ./ ./

EXPOSE 8080

CMD [ "npm", "run", "dev","--host" ]