FROM node:16.18.0-buster
WORKDIR /usr/src/app

COPY package.json ./
RUN npm i -g @nestjs/cli && \
    npm i rxjs && \
    npm i express-serve-static-core
RUN yarn install

COPY . .

RUN yarn build

CMD ["node", "dist/main"]