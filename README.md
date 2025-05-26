# Alvéole - Pain & Pâtisserie 🥐 (ecomm-x-backend REST API)

_Born of air, time and craft - Alvéole is a celebration of the delicate precision behind every loaf, every layer, every crumb._

A RESTful e-commerce API built with Express.js, Node.js, and PostgreSQL. Handles core functionality for products, users, carts, and orders. Built with a focus on modularity, testing, and developer-friendly documentation.

![alveolo logo](/public/images/alveole_logo.png)

## Table of Contents

1.  Motivation
2.  Features
3.  Tech Stack
4.  Getting Started
    - Prerequisites
    - Installation
    - Environment Variables
5.  Running the App
6.  Testing
7.  API Documentation
8.  Continuous Integration
9.  Future Improvements
10. In Progress
11. License
    <!-- - CI/CD -->
    <!-- - Testing -->

## Motivation

What started off as a general e-commerce REST API, hence the name ecomm-x-backend, transitioned into a REST API for a online bakery. I really had no idea where to take the e-commerce backend project and originally I wanted it to be a fitness brand due to my active lifestyle but figured that designing all the clothing and branding for the site would probably take longer than the coding itself. With this is mind I redirected my focus on another passion of mine which is bread and pastries. Recently, I feel like I have turned into my father where I need a piece of bread or pastry to go along with my cup of coffee in the mornings. I have also tried to pick up baking in 2025 and have a couple of bakes already under my belt. I thought let me make this e-comm REST API into a backend for an online bakery and thus 'Alvéole - Pain & Pâtisserie' was born!

## Features

- CRUD operations for products, users, carts, and orders
- User authentication and authorization (JWT-based)
- Relational database integration with PostgreSQL
- API testing with Jest and Supertest
- Swagger documentation
- CI/CD with GitHub Actions

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL
- **Auth:** JSON Web Tokens (JWT)
- **Testing:** Jest, Supertest
- **CI/CD:** GitHub Actions
- **Docs:** Swagger / OpenAPI

## Getting Started

### Prerequisites

- Node.js (latest)
- PostgreSQL

### Installation

```bash
git clone https://github.com/kekedezha/ecomm-x-backend.git
cd ecomm-x-backend
npm install
```

### Environment Variables

Create a `.env` file with:

```env
PORT=5000
PGDATABASE=your_database
USER=your_database_user
SALT_ROUNDS=your_number_of_saltrounds
JWT_SECRET=your_jwt_secret
```

> Uses PostgresSQL as the database.
> Be sure to properly add environment variables for your preferred database

## Running the App

```bash
npm start
```

## Testing

Run the test suite with:

```bash
npm test
```

> Uses **Jest** and **Supertest** to test all major routes.

## API Documentation

Swagger UI is available at:

```
http://localhost:5000/api-docs
```

> OpenAPI docs auto-generate from annotations in the routes.

## Continuous Integration

This project uses **GitHub Actions** to:

- Lint the codebase
- Run all tests
<!-- - Verify build on every push/PR to `main` -->

## Future Improvements

- Stripe integration for payments
- Admin dashboard (frontend)
- Rate limiting & security hardening

## In Progress

- Host backend server

## License

[MIT](LICENSE)
