# Fitness Tracker API (S83 - Mock Technical Exam)

A simple fitness tracking REST API where users register/login with email and
password and log their own workouts. Built with Express + Mongoose.

## Setup

```bash
npm install
cp .env.example .env   # then fill in MONGODB_STRING
npm start
```

Server runs on `http://localhost:4000` (or `PORT`).

## Routes

| Method | Endpoint                  | Auth   | Body                          | Success |
| ------ | ------------------------- | ------ | ----------------------------- | ------- |
| POST   | `/users/register`         | None   | `email, password`             | 201     |
| POST   | `/users/login`            | None   | `email, password`             | 200     |
| GET    | `/users/details`          | Bearer | —                             | 200     |
| POST   | `/workouts/addWorkout`    | Bearer | `name, duration, userId`      | 201     |
| GET    | `/workouts/getMyWorkouts` | Bearer | —                             | 200     |

A workout document contains `name`, `duration`, `userId`, `dateAdded` and
`status` (defaults to `"pending"`). Users can only access their own workouts.
See `fitnessApp.json` for full request/response samples.

## Deployment (Render)

- **Build Command:** `npm install`
- **Start Command:** `node index.js`
- **Environment:** Node
- Set `MONGODB_STRING` (and optionally `JWT_SECRET_KEY`) as environment
  variables in the Render dashboard.
