# Library Management API

A simple Node.js, Express, and MongoDB-based API for managing books and borrow records in a library.

## Features

- Add, update, delete, and retrieve books
- Borrow books with business logic (copies, availability)
- Aggregated summary of borrowed books
- Filtering, sorting, and pagination for book queries

---

## Setup Instructions


1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure MongoDB**

   - The connection string is set in `src/server.ts`. Update it if needed.

3. **Run the server**

   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`.

---

## API Endpoints

### Book APIs

#### Create Book

- **POST** `/api/books`
- **Request Body:**
  ```json
  {
    "title": "The Theory of Everything",
    "author": "Stephen Hawking",
    "genre": "SCIENCE",
    "isbn": "9780553380163",
    "description": "An overview of cosmology and black holes.",
    "copies": 5,
    "available": true
  }
  ```
- **Response:**  
  Returns the created book object.

#### Get All Books

- **GET** `/api/books`
- **Query Parameters:**
  - `filter` (genre)
  - `sortBy` (default: createdAt)
  - `sort` (asc/desc, default: desc)
  - `limit` (default: 10)
- **Response:**  
  List of books matching the query.

#### Get Book by ID

- **GET** `/api/books/:bookId`
- **Response:**  
  Returns the book with the given ID.

#### Update Book

- **PUT** `/api/books/:bookId`
- **Request Body:** (any updatable fields, e.g. copies)
  ```json
  {
    "copies": 50
  }
  ```
- **Response:**  
  Returns the updated book.

#### Delete Book

- **DELETE** `/api/books/:bookId`
- **Response:**  
  Confirms deletion.

---

### Borrow APIs

#### Borrow a Book

- **POST** `/api/borrow`
- **Request Body:**
  ```json
  {
    "book": "BOOK_OBJECT_ID",
    "quantity": 2,
    "dueDate": "2025-07-18T00:00:00.000Z"
  }
  ```
- **Business Logic:**
  - Checks if enough copies are available.
  - Deducts quantity and updates availability.
  - Saves borrow record.
- **Response:**  
  Returns the borrow record.

#### Borrowed Books Summary

- **GET** `/api/borrow`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Borrowed books summary retrieved successfully",
    "data": [
      {
        "book": {
          "title": "The Theory of Everything",
          "isbn": "9780553380163"
        },
        "totalQuantity": 5
      }
    ]
  }
  ```

---

## Book Model Fields

- `title` (string, required)
- `author` (string, required)
- `genre` (enum: FICTION, NON_FICTION, SCIENCE, HISTORY, BIOGRAPHY, FANTASY, required)
- `isbn` (string, required, unique)
- `description` (string, optional)
- `copies` (number, required, non-negative integer)
- `available` (boolean, default: true)

## Borrow Model Fields

- `book` (ObjectId, required, references Book)
- `quantity` (number, required, positive integer)
- `dueDate` (date, required)

---

## Tech Stack

- Node.js
- Express
- TypeScript
- MongoDB (Mongoose)

---
