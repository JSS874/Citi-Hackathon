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

# Credit Card API Documentation

This API provides endpoints for managing and querying credit card information. All endpoints are prefixed with `/api/cards`.

## Base URL
```
http://localhost:8080
```

## Endpoints

### 1. Get All Credit Cards
Retrieves all credit cards in the database.

```http
GET /api/cards
```

**Response**
```json
[
    {
        "id": "123",
        "name": "Chase Sapphire Preferred",
        "bank": "Chase",
        "type": "Travel rewards",
        "annualFee": "$95",
        "apr": "Variable (~19%-29%)",
        "rewards": "2X points on travel and dining",
        "creditScore": {
            "min": 700,
            "notes": "Good to excellent (≈700+; mid 700s preferred)"
        },
        "minIncome": {
            "min": 30000,
            "notes": "Reported ~$30K+ annual income needed"
        }
    }
]
```

### 2. Get Card by ID
Retrieves a specific credit card by its ID.

```http
GET /api/cards/{id}
```

**Response**
```json
{
    "id": "123",
    "name": "Chase Sapphire Preferred",
    "bank": "Chase",
    "type": "Travel rewards",
    "annualFee": "$95",
    "apr": "Variable (~19%-29%)",
    "rewards": "2X points on travel and dining",
    "creditScore": {
        "min": 700,
        "notes": "Good to excellent (≈700+; mid 700s preferred)"
    },
    "minIncome": {
        "min": 30000,
        "notes": "Reported ~$30K+ annual income needed"
    }
}
```

### 3. Get Cards by Type
Retrieves all credit cards of a specific type.

```http
GET /api/cards/type/{type}
```

**Example**
```http
GET /api/cards/type/Cash%20back
```

**Response**: Array of credit cards matching the type

### 4. Get Cards by Bank
Retrieves all credit cards from a specific bank.

```http
GET /api/cards/bank/{bank}
```

**Example**
```http
GET /api/cards/bank/Chase
```

**Response**: Array of credit cards from the specified bank

### 5. Get Cards by Minimum Credit Score
Retrieves all credit cards with credit score requirements less than or equal to the specified score.

```http
GET /api/cards/credit-score/{minScore}
```

**Example**
```http
GET /api/cards/credit-score/700
```

**Response**: Array of credit cards matching the credit score criteria

### 6. Get Cards by Maximum Annual Fee
Retrieves all credit cards with annual fees less than or equal to the specified amount.

```http
GET /api/cards/annual-fee/{maxFee}
```

**Example**
```http
GET /api/cards/annual-fee/$100
```

**Response**: Array of credit cards matching the annual fee criteria

### 7. Create New Card
Creates a new credit card.

```http
POST /api/cards
Content-Type: application/json
```

**Request Body**
```json
{
    "name": "Test Card",
    "bank": "Test Bank",
    "type": "Test rewards",
    "annualFee": "$50",
    "apr": "15%",
    "rewards": "2% cash back",
    "creditScore": {
        "min": 700,
        "notes": "Good credit required"
    },
    "minIncome": {
        "min": 30000,
        "notes": "Minimum income requirement"
    }
}
```

**Response**: Created credit card object with generated ID

### 8. Update Card
Updates an existing credit card.

```http
PUT /api/cards/{id}
Content-Type: application/json
```

**Request Body**: Same structure as Create Card
**Response**: Updated credit card object

### 9. Delete Card
Deletes a credit card.

```http
DELETE /api/cards/{id}
```

**Response**: 200 OK if successful

### 10. Search Cards
Search for credit cards using multiple criteria.

```http
GET /api/cards/search
```

**Query Parameters** (all optional):
- `type`: Card type (e.g., "Cash back", "Travel rewards")
- `bank`: Bank name
- `minCreditScore`: Maximum credit score requirement
- `maxAnnualFee`: Maximum annual fee

**Example**
```http
GET /api/cards/search?type=Cash%20back&bank=Chase&minCreditScore=700&maxAnnualFee=$100
```

**Response**: Array of credit cards matching all specified criteria

## Response Codes

- `200 OK`: Request successful
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid input
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server-side error

## CORS Support
All endpoints support Cross-Origin Resource Sharing (CORS) for frontend access.

## Data Models

### CreditCard
```json
{
    "id": "string",
    "name": "string",
    "bank": "string",
    "type": "string",
    "annualFee": "string",
    "apr": "string",
    "rewards": "string",
    "creditScore": {
        "min": "number",
        "notes": "string"
    },
    "minIncome": {
        "min": "number",
        "notes": "string"
    }
}
```

## Example Usage

### Using cURL
```bash
# Get all cards
curl http://localhost:8080/api/cards

# Get cards by type
curl http://localhost:8080/api/cards/type/Cash%20back

# Create new card
curl -X POST http://localhost:8080/api/cards \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Card",
    "bank": "Test Bank",
    "type": "Test rewards",
    "annualFee": "$50",
    "apr": "15%",
    "rewards": "2% cash back",
    "creditScore": {
        "min": 700,
        "notes": "Good credit required"
    },
    "minIncome": {
        "min": 30000,
        "notes": "Minimum income requirement"
    }
  }'
```

### Using Postman
1. Import the following collection:
```json
{
  "info": {
    "name": "Credit Card API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Cards",
      "request": {
        "method": "GET",
        "url": "http://localhost:8080/api/cards"
      }
    },
    {
      "name": "Get Cards by Type",
      "request": {
        "method": "GET",
        "url": "http://localhost:8080/api/cards/type/Cash%20back"
      }
    }
  ]
}
```
