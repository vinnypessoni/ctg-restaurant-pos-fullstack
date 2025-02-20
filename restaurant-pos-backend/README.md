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

You should see the API running in 