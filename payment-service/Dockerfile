FROM node:18.14.2-alpine

WORKDIR /payment

COPY . .

# RUN ["npm",  "i"]

# COPY . .

RUN ["npm", "i", "-g", "pm2"] 

RUN ["npm", "run", "build"]

# SHELL ["/bin/bash", "-c"] 

# CMD ["start.sh"]

# CMD [ "npm", "start"]

