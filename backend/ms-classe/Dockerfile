# backend/ms-cv/Dockerfile

# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# 2. Builder le microservice classe
WORKDIR /app/backend/ms-classe

# Optimisation du cache des dépendances pour ms-classe
COPY backend/ms-classe/pom.xml .
#RUN mvn dependency:go-offline -B

# Copie des sources et build
COPY backend/ms-classe/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copier le JAR final
COPY --from=build /app/backend/ms-classe/target/*.jar app.jar

# Exposer le port
EXPOSE 8083

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
