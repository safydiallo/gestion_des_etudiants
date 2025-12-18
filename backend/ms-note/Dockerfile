# backend/ms-cv/Dockerfile

# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# 2. Builder le microservice note
WORKDIR /app/backend/ms-note

# Optimisation du cache des dépendances pour ms-note
COPY backend/ms-note/pom.xml .
#RUN mvn dependency:go-offline -B

# Copie des sources et build
COPY backend/ms-note/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copier le JAR final
COPY --from=build /app/backend/ms-note/target/*.jar app.jar

# Exposer le port
EXPOSE 8085

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
