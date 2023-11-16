# Utiliser l'image adoptopenjdk avec Java 17
FROM  eclipse-temurin:17

# Définir le répertoire de travail dans l'image
WORKDIR /src

# Copier le JAR construit dans le répertoire de travail
COPY /target/back.jar /src/back.jar

# Exposer le port 8080
EXPOSE 8080

# Commande pour exécuter l'application Spring Boot
CMD ["java", "-jar", "back.jar"]
