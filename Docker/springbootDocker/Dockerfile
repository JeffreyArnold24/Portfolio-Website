FROM openjdk:21-jdk-slim AS builder
WORKDIR /app/springBootServer
COPY ./../../springBootServer /app/springBootServer
EXPOSE 8080
CMD ["/app/springBootServer/mvnw", "spring-boot:run"]