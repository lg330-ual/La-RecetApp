
# Backend
FROM eclipse-temurin:17-jdk-alpine as builder
WORKDIR /tmp
COPY . .
RUN sed -i \
    's|localhost:5432/postgres|db:5432/larecetapp-db|'\
    src/main/resources/application.properties
RUN ./mvnw clean package

FROM eclipse-temurin:17-jdk-alpine
COPY --from=builder /tmp/target/*.jar app.jar
CMD ["java","-jar","app.jar"]