# Alvéole - Pain & Pâtisserie 🥐 (ecomm-x-backend REST API)

_Born of air, time and craft - Alvéole is a celebration of the delicate precision behind every loaf, every layer, every crumb._

A RESTful e-commerce API built with Express.js, Node.js, and PostgreSQL. Handles core functionality for products, users, carts, and orders. Built with a focus on modularity, testing, and developer-friendly documentation.

![alveolo logo](/public/images/alveole_logo.png)

## Table of Contents

- Motivation
- Features
- Tech Stack
- Getting Started
- Future Improvements
- In Progress
  <!--- - API Documentation) -->
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

- Node.js
- Express.js
- PostgreSQL
- JWT for auth
- Jest & Supertest for testing
- Swagger for API docs
- GitHub Actions for CI

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

```
PORT=5000
PGDATABASE=your_database
USER=your_database_user
SALT_ROUNDS=your_number_of_saltrounds
JWT_SECRET=your_jwt_secret

```

### Running the App

`npm start`

## Future Improvements

- Stripe integration for payments
- Admin dashboard (frontend)
- Rate limiting & security hardening

## In Progress ⏳

- Create an OpenAPI specification for the REST API to detail API endpoints
- Host backend server
