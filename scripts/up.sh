docker-compose up -d
sleep 2
docker exec -it planify-db ./db.sh
