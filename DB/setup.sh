docker-compose up -d
docker-compose exec db psql -U myuser -d mydatabase -c '\dt'