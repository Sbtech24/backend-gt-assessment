# backend-gt-assessment

# Task Management API

A simple **Task Management API** built with **Node.js**, **TypeScript**, **Express**, and **TypeORM** using **PostgreSQL**.  
This API allows users to create, assign, update, and manage tasks with assigner/assignee permissions.

---

## Features

- Create tasks and assign them to users
- Update task details (assigner only)
- Update task status (assignee only)
- Unassign or delete tasks (assigner only)
- Get all tasks with optional filters (`assignedTo` and `status`)
- Authorization enforced via `x-user-id` header
- PostgreSQL database with TypeORM entities
- Seed script for quick testing

---

## Tech Stack

- Node.js + TypeScript
- Express.js
- PostgreSQL
- TypeORM
- ts-node-dev for development


---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd task-2-api-implementation
```
### 2 . Install dependencies
```
npm install
```
### 3 . Set up environment variables
```
cp .env.example .env
```
### 4 .Initialize Database

### 5 . Seed the database
```
npm run seed
```
### 6. Run the api in devmode
```
npm run dev
```


## Examples of API requests in postman 

#### Get all tasks 
![alt text](<Screenshot 2026-03-18 124200.png>) 

#### Create tasks
![alt text](<Screenshot 2026-03-18 124544.png>) 

#### Update tasks
![alt text](<Screenshot 2026-03-18 124909.png>)

#### Delete tasks

![alt text](<Screenshot 2026-03-18 124945.png>)

### SOME ERROR RESPONSES 

![alt text](<Screenshot 2026-03-18 125047.png>)


![alt text](<Screenshot 2026-03-18 124724.png>) 
