FROM node:10.8

ADD . /web
WORKDIR /web
COPY package.json package-lock.json /web/

RUN npm install

COPY . /web

EXPOSE 8080
CMD [ "npm", "run", "watch"]