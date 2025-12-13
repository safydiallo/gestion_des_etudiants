# backend/ms-discover/Dockerfile

# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# Optimisation du cache des dépendances
COPY pom.xml .
#RUN mvn dependency:go-offline -B

# Copie des sources et build
COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copier le JAR final
COPY --from=build /app/target/*.jar app.jar

# Exposer le port
EXPOSE 8761

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
