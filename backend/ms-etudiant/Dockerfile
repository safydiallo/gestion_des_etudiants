# backend/ms-cv/Dockerfile

# Stage 1: Build
FROM maven:3.9.6-eclipse-temurin-17-alpine AS build
WORKDIR /app

# 2. Builder le microservice etudiant
WORKDIR /app/backend/ms-etudiant

# Optimisation du cache des dépendances pour ms-etudiant
COPY backend/ms-etudiant/pom.xml .
#RUN mvn dependency:go-offline -B

# Copie des sources et build
COPY backend/ms-etudiant/src ./src
RUN mvn clean package -DskipTests

# Stage 2: Run
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Copier le JAR final
COPY --from=build /app/backend/ms-etudiant/target/*.jar app.jar

# Exposer le port
EXPOSE 8082

# Lancer l'application
ENTRYPOINT ["java", "-jar", "app.jar"]
