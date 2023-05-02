FROM node:18.14.2-alpine

# FROM ubuntu:20.04
# RUN apt-get update
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
# RUN apt-get install -y nodejs


WORKDIR /auth

COPY . .

RUN ["npm", "i"]

RUN ["npm", "i", "-g", "pm2"] 

RUN ["npm", "run", "build"]

CMD [ "npm", "run", "auth"]
# CMD [ "npm", "start"]

