FROM postgres:latest

ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres

WORKDIR /db

COPY ./migrations/*.sql .

COPY ./db.sh .

RUN chmod +x ./db.sh

EXPOSE 5432

# USER postgres

# CMD ["./db.sh"]
