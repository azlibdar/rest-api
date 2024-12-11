# REST _APIs_

This project is a simple REST API built using Node.js, Express, and MongoDB. It supports basic CRUD (Create, Read, Update, Delete) operations for user management.

> As a frontend developer, I created this project to gain a deeper understanding of how REST APIs function.

<hr>

## Getting Started

### Prerequisites

Make sure you have the following installed before starting:

- Node.js
- MongoDB - You can create a free MongoDB Atlas account [here](https://www.mongodb.com/cloud/atlas/register).

### Installation

#### 1. Clone the repository:

```sh
  git clone https://github.com/azlibdar/rest-api.git
  cd rest-api
```

#### 2. Install the dependencies:

```sh
  npm install
```

#### 3. Environment Configuration:

1. Create a `.env` file in the project root
2. Copy contents from `.env.example`
3. Fill in your specific configuration:

   ```env
   MONGO_URI=<Your MongoDB URI>
   # Connection string for your MongoDB database.

   CORS_ORIGIN=http://localhost:8080
   # Allowed origin for Cross-Origin Resource Sharing (CORS).

   AUTH_SECRET=<Your Auth Secret>
   # Used for authentication and password hashing. Defaults to `AZLAN-REST-API` if not provided.
   ```

#### 4. Start the application:

```sh
  npm start
```

> The server will be running on `http://localhost:8080`.

<br>
<hr>
<br>

## API Endpoints

### Authentication

#### 1. Register a new user

```plain
Route (POST): /auth/register
Request body: { "username": "abc", "email": "abc@example.com", "password": "abc123" }
```

#### 2. Login a user

```plain
Route (POST): /auth/login
Request body: { "email": "abc@example.com", "password": "abc123" }

Response: A session token will be generated.
```

#### 3. Logout user

```plain
Route (POST): /auth/logout
Request body: N/A

Response: The user's session token will be invalidated.
```

### User Management

#### 1. Get all users

```plain
Route (GET): /list-users
Request body: N/A

Authentication required.
```

#### 2. Delete a user account

```plain
Route (DELETE): /delete-account/:id
Request body: N/A

Authentication required. User must be the owner of the account.
```

#### 3. Change password

```plain
Route (PATCH): /change-password/:id
Request body: { "oldPassword": "123", "newPassword": "1234" }
Response: The user's session token will be invalidated, and a new salt will be generated.

Authentication required. User must be the owner of the account.
```

<br>
<hr>
<br>

Contributions are welcome! Feel free to suggest features, report issues, or submit pull requests.
