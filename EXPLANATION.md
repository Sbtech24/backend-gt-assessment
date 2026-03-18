## Explanations

# Implmentation Approach 
 - Define the Task entity with fields (id, title, priority, status, assignedTo, assignedBy, createdAt) and allowed statuses/priorities.
 - Identify business rules: assigner vs assignee permissions.

 - Decide on backend stack: Node.js + TypeScript + Express + TypeORM with PostgreSQL.
 - Implement middleware to extract userId from headers for authentication.
 - Build services to encapsulate database and business logic.
 - Add controllers to handle HTTP requests and responses cleanly.
 - Finally, define routes to map endpoints to controllers.

# Reason for code structure
# Code structure
 Routes: Only define endpoints and middleware; keep them lightweight.

Controllers: Handle request validation, response formatting, and error handling.

Services: Contain all business logic, database queries, and authorization checks.

Entities: Define database schema via TypeORM, supporting relations and constraints.

Middleware: Central place for auth/permissions.
 I structured the code this way for the following reasons 

 1. Clear sepration of concerns 
 2. scalability --The choosen structure ensure that more routes can be added cleanly without affecting existing routes
 3. Maintainability - I followed the code structure to help make it easier for future maintainability and easier onboarding for other developers 
 4. Easy to add tests

# Assumptions made 
The x-user-id header represents the currently authenticated user.

Users are already created in the system; tasks can only be assigned to existing users.

No pagination or advanced filtering was required for GET /tasks (though it could be added).

Tasks can be unassigned (assignedTo set to null) but not reassigned directly in this version

# What I would improve if given more time 
I would improve the following:

Authentication & Authorization: Use JWT or OAuth instead of a simple header.

Validation: Integrate a library like Zod or Joi for stricter input validation.

Pagination and Filtering: For GET /tasks, support limit, offset, and advanced filters.

Caching: Add Redis to reduce DB load for frequently accessed tasks.

Unit & Integration Tests: Cover services and endpoints using Jest or Vitest.Currently no tests implmented

Concurrency & Transactions: Handle race conditions when multiple users update the same task.

API Documentation: Swagger/OpenAPI for better developer experience.

#  AI Assistance Used
1. Copilot -  Helped to quickly resolve type issues
2. Chatgpt/Claude - Helped with initial code structure - Took inference from both compared and improved it
