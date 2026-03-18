

# Task 1: API Reasoning and Validation

## Answers


### 1. Validation

What validations should be performed before creating an order?

Consider both **data validation and business logic validation**.

data Validation 
- userId must exist,be a number greater than 0 and can be in uuid format
- Items must exist and cannot be empty and must be an array 
- ProductId is required and must be a number greater than 0 
- Quantity is also required and must be a number greater than 0

Business Logic Validation 
- UserId must be present and the user must be active. 
- User must be logged in before performing any request
- Product must exist before an order can be placed 
- Quanity of the order for a product must not surpass the available quanity in stock 
- Price should be calculated and can include,tax vat e.t.c 
- No duplicate productId in the items array, instead the quantity of the product should be updated



### 2. Possible Errors

List at least **5 possible errors** that could occur when processing this request.

FIVE POSSIBLE ERRORS INCLUDE  
- Unauthorized/ invalid user - When the endpoint is called without being authorized (401)
- Bad Request  - Occurs when the frontend send an invalid request.
- Product Not found -  Occurs when the frontend sends a request for a product that is not in the database 
- Internal server Error -  Could occur as a result of various number of reasons such as unhandled exceptions, improper server configuration and other complex issues.
- CORS Error -Cross origin resource sharing error occurs when the client usually web (because it occurs on the browser) is not granted permission to access resources from a particular endpoint, which leads to the browser blocking the sharing of resources between the api endpoint and the application.

### 3. HTTP Responses

What HTTP status codes should be returned for the following scenarios?

- Successful order creation  - **201** should be returned on successful creation of a new order. 201 Indicates that a new resource has been successfully created and it usually accompanies the post Request. e

- Invalid request body - **400** which means bad request should be returned. When the frontend sends an incomplete request body or an invalid request, the appropriate status code returned should be the 400 status code signifying that the request is invalid and should be rechecked for missing values or errors 

- Product not found  - **404** which means Not found is the appropriate status code to be returned. For example if we have an endpoint to search for products and the users sends a request for a product that is not returned in our database we return the Not found status code and send the user a message that the product was not found. 

- Server error  **500** is the status code to return when there is an issue with the server. It is also known as internal server error. 500 usually signifies that something is causing the server to not respond either a broken db connection, unhandled errors e.t.c so many things can cause the server to fail, but the appropriate status code to let the frontend know there's a server error is **500**



