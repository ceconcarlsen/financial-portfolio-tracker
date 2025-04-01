# Financial Portfolio Tracker API

### **How to run**

```docker compose up``` -> Runs the docker-compose.yml for database the environment

``` pnpm install ``` -> To install dependencies

``` npx prisma generate ``` -> Import prisma client

``` npx prisma migrate dev ``` -> Create migration

``` pnpm run dev ``` -> To run the project


### **Postman Collection**

1. **Portfolio API**:
   - `GET /api/portfolios`: Fetch all portfolios.
   - `POST /api/portfolios`: Create a new portfolio.
   - `PATCH /api/portfolios/{id}`: Update an existing portfolio.
   - `DELETE /api/portfolios/{id}`: Delete a portfolio.

2. **Trade API**:
   - `GET /api/trades`: Fetch all trades for a specific portfolio.
   - `POST /api/trades`: Create a new trade.
   - `PATCH /api/trades/{id}`: Update an existing trade.
   - `DELETE /api/trades/{id}`: Delete a trade.

3. **Chart API**:
   - `GET /api/chart`: Fetch all trades for a specific portfolio.

### **Postman Collection JSON**

```json
{
  "info": {
    "_postman_id": "12345",
    "name": "Financial Portfolio Tracker API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "GET /api/portfolios",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/portfolios"
      },
      "response": []
    },
    {
      "name": "POST /api/portfolios",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/portfolios",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"My New Portfolio\",\n  \"initialValue\": 10000\n}"
        }
      },
      "response": []
    },
    {
      "name": "PATCH /api/portfolios/{id}",
      "request": {
        "method": "PATCH",
        "url": "http://localhost:3000/api/portfolios/{id}",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Updated Portfolio Name\",\n  \"initialValue\": 12000\n}"
        }
      },
      "response": []
    },
    {
      "name": "DELETE /api/portfolios/{id}",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/api/portfolios/{id}"
      },
      "response": []
    },
    {
      "name": "GET /api/trades",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/trades?portfolioId=1"
      },
      "response": []
    },
    {
      "name": "POST /api/trades",
      "request": {
        "method": "POST",
        "url": "http://localhost:3000/api/trades",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"portfolioId\": 1,\n  \"ticker\": \"AAPL\",\n  \"entryPrice\": 150,\n  \"exitPrice\": 170,\n  \"quantity\": 10,\n  \"date\": \"2025-03-30\"\n}"
        }
      },
      "response": []
    },
    {
      "name": "PATCH /api/trades/{id}",
      "request": {
        "method": "PATCH",
        "url": "http://localhost:3000/api/trades/{id}",
        "body": {
          "mode": "raw",
          "raw": "{\n  \"ticker\": \"AAPL\",\n  \"entryPrice\": 150,\n  \"exitPrice\": 175,\n  \"quantity\": 10,\n  \"date\": \"2025-03-31\"\n}"
        }
      },
      "response": []
    },
    {
      "name": "DELETE /api/trades/{id}",
      "request": {
        "method": "DELETE",
        "url": "http://localhost:3000/api/trades/{id}"
      },
      "response": []
    },
    {
      "name": "GET /api/chart",
      "request": {
        "method": "GET",
        "url": "http://localhost:3000/api/chart"
      },
      "response": []
    },
  ]
}
