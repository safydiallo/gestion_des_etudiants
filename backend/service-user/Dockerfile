# backend/service-user/Dockerfile

# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# 2. Builder le microservice service-user
WORKDIR /app/backend/service-user

# Optimisation du cache des dépendances pour service-user
COPY backend/service-user/pom.xml .

# Copie des sources et build
COPY backend/service-user/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copier le JAR final
COPY --from=build /app/backend/service-user/target/*.jar app.jar

# Exposer le port
EXPOSE 8081

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
