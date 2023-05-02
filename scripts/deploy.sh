# !/bin/bash

docker-compose down
sleep 2
docker-compose pull
sleep 2
docker-compose up -d
