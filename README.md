# Hostel Hygiene System

The **Hostel Hygiene System** is a full-stack web application designed to streamline hostel cleanliness management. The system allows hostlers to submit cleaning requests and enables cleaners to view and update tasks. It includes separate login functionality for hostlers and cleaners, request tracking, and administrator controls for user management.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Frontend Scripts and Dependencies](#frontend-scripts-and-dependencies)
- [Backend Scripts and Dependencies](#backend-scripts-and-dependencies)
- [License](#license)

---

## Features

- **Hostler Login and Request Submission**: Allows hostlers to log in, submit cleaning requests, and view request status.
- **Cleaner Login and Task Management**: Cleaners can log in, view rooms needing cleaning, and mark tasks as completed.
- **Administrator Controls**: Add new hostlers and cleaners to the system.
- **Request Status Tracking**: Track requests from submission through completion.
- **Secure Authentication**: Password hashing and secure session handling for all users.

---

## Tech Stack

- **Frontend**: Next.js, React, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, bcrypt
- **Session Management**: express-session for secure session handling
- **Authentication**: JWT (recommended for production)

---

## Project Structure

```plaintext
hostel-hygiene-system/
├── backend/
│   ├── models/
│   │   ├── CleaningRecord.js
│   │   ├── hostlers.js
│   │   └── staff.js
│   ├── mongoose/
│   │   └── mongoose.js
│   ├── routers/
│   │   ├── cleaner.js
│   │   └── hostlers.js
│   ├── app.js
│   ├── package.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── app/
│   │   │   ├── login
│   │   │   ├── requests
│   │   │   └── submitRequest
│   │   ├── utils/
│   │   │   └── axios.js
│   ├── global.css
│   ├── layout.js
│   ├── page.js
│   ├── package.json
└── README.md
```

---

## Setup Instructions

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/hostel-hygiene-system.git
   cd hostel-hygiene-system
   ```

2. **Backend Setup**:

   - Navigate to the backend directory:

     ```bash
     cd backend
     ```

   - Install backend dependencies:

     ```bash
     npm install
     ```

   - Create a `.env` file with the following content:

     ```plaintext
     MONGO_URL=your_mongodb_connection_string
     ```

   - Start the backend server:

     ```bash
     npm run dev
     ```

3. **Frontend Setup**:

   - Navigate to the frontend directory:

     ```bash
     cd ../frontend
     ```

   - Install frontend dependencies:

     ```bash
     npm install
     ```

   - Create a `.env` file with the following content:

     ```plaintext
     NEXT_PUBLIC_API_BASE_URL=http://localhost:3000
     ```

   - Start the frontend server:

     ```bash
     npm run dev
     ```

---

## Environment Variables

For **Backend** (in `backend/.env`):

- `MONGO_URL`: MongoDB connection string for the database.

For **Frontend** (in `frontend/.env`):

- `NEXT_PUBLIC_API_BASE_URL`: The base URL for the backend API, typically `http://localhost:3000` during development.

---

## Usage

- **Hostlers** can log in, submit cleaning requests, and view their request history.
- **Cleaners** can log in, view pending cleaning requests for their assigned hostel, and mark tasks as completed.
- **Administrators** can add new hostlers and cleaners through dedicated API endpoints.

---

## API Endpoints

### Hostler Endpoints

- **Login Hostler**:  
  - **POST** `/hostlerlogin`  
  - Body: `{ "rollnumber": number, "password": string }`  
  - Response: Returns hostler details upon successful authentication.

- **Submit Cleaning Request**:  
  - **POST** `/CleaningRequest`  
  - Body: `{ "rollnumber": number, "request": string }`  
  - Response: Returns the status of request submission.

- **View Request History**:  
  - **POST** `/FetchAllHostlerReq`  
  - Body: `{ "rollnumber": number }`  
  - Response: Returns the hostler's cleaning request history.

- **Mark Request as Completed**:  
  - **POST** `/Completed`  
  - Body: `{ "rollnumber": number, "request": string }`  
  - Response: Updates the request status to "Completed".

### Cleaner Endpoints

- **Login Cleaner**:  
  - **POST** `/cleanerlogin`  
  - Body: `{ "cleanerid": number, "password": string }`  
  - Response: Returns cleaner details upon successful authentication.

- **Get Rooms Needing Cleaning**:  
  - **POST** `/NeededToClean`  
  - Body: `{ "cleanerid": number }`  
  - Response: Returns pending cleaning requests for the cleaner's assigned hostel.

---

## Frontend Scripts and Dependencies

### Scripts

- **`dev`**: Runs the frontend development server.
- **`build`**: Builds the frontend application for production.
- **`start`**: Starts the production server.
- **`lint`**: Runs ESLint for code quality checks.

### Dependencies

- **`axios`**: Used for making HTTP requests to the backend.
- **`next`**: The Next.js framework for building the frontend.
- **`react` and `react-dom`**: The core libraries for building user interfaces with React.

---

## Backend Scripts and Dependencies

### Scripts

- **`test`**: Placeholder for test scripts (optional).
- **`dev`**: Uses `nodemon` to run the backend server in development mode, enabling automatic restarts on file changes.

### Dependencies

- **`bcrypt`**: Used for hashing passwords securely.
- **`cors`**: Allows cross-origin requests between the frontend and backend servers.
- **`dotenv`**: Loads environment variables from a `.env` file.
- **`express`**: The core backend framework for handling routes and requests.
- **`express-session`**: Manages session data for user authentication.
- **`mongodb`**: MongoDB driver for connecting to the MongoDB database.
- **`mongoose`**: An ODM library for MongoDB, making it easier to work with MongoDB data.
- **`nodemon`** (Dev Dependency): Automatically restarts the server on file changes.

---

## License

This project is licensed under the MIT License.
