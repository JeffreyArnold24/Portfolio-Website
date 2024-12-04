FROM openjdk:21-jdk-slim AS builder
WORKDIR /app/springBootServer
COPY ./../../sqlite_database/web_database.db /app/sqlite_database/web_database.db
COPY ./../../springBootServer /app/springBootServer
EXPOSE 8080
CMD ["/app/springBootServer/mvnw", "spring-boot:run"]