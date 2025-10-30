# CourseHubApi

A backend API for an online course platform — similar to Udemy — designed to heavily practice routing, query filtering, dynamic paths, pagination, and role-based access.

# API Features (Routes to Implement)

## User Routes

| Method  | Endpoint              | Description                               | Access     |
| ------- | --------------------- | ----------------------------------------- | ---------- |
| `POST`  | `/api/users/register` | Register as a new user                    | Public     |
| `POST`  | `/api/users/login`    | Login and get token                       | Public     |
| `GET`   | `/api/users/profile`  | Get user profile                          | Protected  |
| `PATCH` | `/api/users/profile`  | Update profile                            | Protected  |
| `GET`   | `/api/users`          | Get all users (with filtering/pagination) | Admin only |
| `PATCH` | `/api/users/:id/role` | Change user role (promote/demote)         | Admin only |

## Course Routes

| Method   | Endpoint                         | Description                                                                                                       | Access          |
| -------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------- | --------------- |
| `GET`    | `/api/courses`                   | Get all courses (supports query params: `?category=backend&price[lte]=500&sort=price&page=2&limit=5&search=node`) | Public          |
| `GET`    | `/api/courses/:id`               | Get a single course                                                                                               | Public          |
| `POST`   | `/api/courses`                   | Create new course                                                                                                 | Instructor only |
| `PATCH`  | `/api/courses/:id`               | Update own course                                                                                                 | Instructor only |
| `DELETE` | `/api/courses/:id`               | Delete own course                                                                                                 | Instructor only |
| `GET`    | `/api/courses/:courseId/reviews` | Get reviews for a course (nested route)                                                                           | Public          |

## Review Routes

| Method   | Endpoint                         | Description                                         | Access       |
| -------- | -------------------------------- | --------------------------------------------------- | ------------ |
| `POST`   | `/api/courses/:courseId/reviews` | Add a review for a course                           | Student only |
| `GET`    | `/api/reviews`                   | Get all reviews with filtering, sorting, pagination | Public       |
| `PATCH`  | `/api/reviews/:id`               | Update own review                                   | Student only |
| `DELETE` | `/api/reviews/:id`               | Delete own review                                   | Student only |
| `DELETE` | `/api/admin/reviews/:id`         | Delete any review                                   | Admin only   |

## Enrollment Routes

| Method   | Endpoint                              | Description                            | Access          |
| -------- | ------------------------------------- | -------------------------------------- | --------------- |
| `POST`   | `/api/enrollments/:courseId`          | Enroll in a course                     | Student only    |
| `GET`    | `/api/enrollments/my`                 | View enrolled courses                  | Student only    |
| `GET`    | `/api/enrollments/:courseId/students` | View all students enrolled in a course | Instructor only |
| `DELETE` | `/api/enrollments/:courseId`          | Unenroll from a course                 | Student only    |
