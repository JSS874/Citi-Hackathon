# Backend

This is the backend for the Credit Card Recommender application. It is built using Spring Boot and MongoDB.

## Running the Backend

1. Ensure you have Java 17 and Maven installed.
2. Navigate to the `backend` directory.
3. Run the following command to start the application:
   ```bash
   ./mvnw spring-boot:run
   ```

## Project Structure

- **Models**: Located in `src/main/java/com/example/backend/model/`. These are the data structures used to represent entities in the application. For example, `CreditCard.java` defines the structure of a credit card.
- **Controllers**: Located in `src/main/java/com/example/backend/controller/`. Controllers handle incoming HTTP requests and return responses. They interact with the service layer to perform business logic.
- **Repositories**: Located in `src/main/java/com/example/backend/repository/`. Repositories provide an interface for accessing the database. They extend `MongoRepository` to perform CRUD operations on the models.

## Modifying the Application

- **Models**: To add a new model, create a new Java class in the `model` directory. Annotate it with `@Document` to specify the MongoDB collection it maps to.
- **Controllers**: To add a new controller, create a new Java class in the `controller` directory. Annotate it with `@RestController` and define methods to handle HTTP requests.
- **Repositories**: To add a new repository, create a new interface in the `repository` directory. Extend `MongoRepository` and specify the model and ID type.
