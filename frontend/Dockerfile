FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y nodejs
RUN apt-get install -y npm

RUN npm install -g http-server

WORKDIR /usr/src/app

# Install dependencies
COPY package.json /usr/src/app

RUN npm install

COPY . /usr/src/app

EXPOSE 8080
CMD ["http-server", "-s"]
