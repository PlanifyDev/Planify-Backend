FROM node:16.17.0-alpine

WORKDIR /auth-service

COPY package.json .

RUN ["npm",  "i"]

COPY . .

SHELL ["/bin/bash", "-c"] 

# CMD ["start.sh"]

CMD [ "npm", "start"]

