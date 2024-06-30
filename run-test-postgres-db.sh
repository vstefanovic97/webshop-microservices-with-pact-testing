docker run --name my-postgres-db \
  -e POSTGRES_DB=test-db \
  -e POSTGRES_USER=vuk \
  -e POSTGRES_PASSWORD=test1234 \
  -p 5432:5432 \
  -d postgres