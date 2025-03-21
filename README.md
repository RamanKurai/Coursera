# Course Selling API (CRUD Application)

This is a backend-only CRUD (Create, Read, Update, Delete) application for managing course selling, built using Node.js and Express.

## Features

- Create new courses
- Retrieve all courses or a single course by ID
- Update course details
- Delete courses
- User can see the course 
- User can purchase the course(not intergrate payment gateway yet)

## Tech Stack

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB (Optional)** – Database for storing course details (if using a database)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/course-selling-api.git
   cd course-selling-api
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:5000` (or as configured in your environment variables).

## API Endpoints

### 1. Create a Course

- **Endpoint:** `POST /courses`
- **Request Body:**
  ```json
  {
    "title": "Course Title",
    "description": "Course Description",
    "price": 49.99,
    "instructor": "Instructor Name"
  }
  ```
- **Response:** Course details with generated ID.

### 2. Get All Courses

- **Endpoint:** `GET /courses`
- **Response:** List of all available courses.

### 3. Get a Course by ID

- **Endpoint:** `GET /courses/:id`
- **Response:** Details of the requested course.

### 4. Update a Course

- **Endpoint:** `PUT /courses/:id`
- **Request Body:** Any course field(s) to update.
- **Response:** Updated course details.

### 5. Delete a Course

- **Endpoint:** `DELETE /courses/:id`
- **Response:** Success message.

## Environment Variables

Create a `.env` file and define necessary variables:

```sh
PORT=5000
MONGO_URI=your_mongodb_connection_string  # If using MongoDB
```

## Dependencies

- `express`
- `dotenv` (for environment variables)
- `mongoose` (if using MongoDB)
- `cors` (for handling cross-origin requests)
- `body-parser`

## License

This project is licensed under the MIT License.
