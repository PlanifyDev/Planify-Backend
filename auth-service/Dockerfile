FROM node:18.14.2-alpine

# FROM ubuntu:20.04
# RUN apt-get update
# RUN apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_lts.x | bash -
# RUN apt-get install -y nodejs


WORKDIR /auth

COPY . .

# RUN ["npm", "i"]

RUN ["npm", "i", "-g", "pm2"] 

# RUN ["npm", "run", "build"]

# RUN ["chmod", "+x", "build.sh"]
# RUN ["chmod", "+x", "start.sh"]
# RUN ["apk", "add", "bash"]

# SHELL ["/bin/bash", "-c"] 

# CMD ["./start.sh"]

# CMD ["sh", "-c", "npm run start:prod && npm run start:rpc_prod &"]

CMD [ "npm", "run", "auth"]

