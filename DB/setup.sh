docker-compose down -v  
docker-compose up --build
docker-compose exec db psql -U myuser -d mydatabase -c '\dt'