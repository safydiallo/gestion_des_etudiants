# backend/ms-cv/Dockerfile

# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# 2. Builder le microservice enseignant
WORKDIR /app/backend/ms-enseignant

# Optimisation du cache des dépendances pour ms-enseignant
COPY backend/ms-enseignant/pom.xml .


# Copie des sources et build
COPY backend/ms-enseignant/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copier le JAR final
COPY --from=build /app/backend/ms-enseignant/target/*.jar app.jar

# Exposer le port
EXPOSE 8084

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
