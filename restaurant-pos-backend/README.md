# Getting Started

### How to run the backend independently

This is a Java + SpringBoot backend and you can run it independently of the frontend.

In fact, you don´t need docker to run if you want to run it directly. 

As maven project, you can use the maven wrapper.

Navigate to the backend directory:

```shellscript
cd backend
```

Build the project (UNIX / MAC systems)

```shellscript
./mvnw spring-boot:run
```

OR Windows Systemas

```shellscript
mvnw.cmd spring-boot:run
```

You should see the API running in http://localhost:8080/


### when you're actively developing and editing Java code, running with `docker compose up` isn't the most efficient approach. Here's why:

1. The Docker image contains a snapshot of your code at build time
2. Every code change requires rebuilding the Docker image to see the changes
3. This process is slow and not suitable for development


Instead, here are better approaches for development:

Option 1 (Recommended for Development):
Run the backend directly on your machine while developing:

```shellscript
cd backend
./mvnw spring-boot:run
```

(For Windows: `mvnw.cmd spring-boot:run`)

This way:

- Changes are reflected quickly
- Hot reload works
- Faster development cycle
- Easier debugging


### SWAGGER available when you run the project

* http://localhost:8080/swagger-ui.html
* http://localhost:8080/v3/api-docs