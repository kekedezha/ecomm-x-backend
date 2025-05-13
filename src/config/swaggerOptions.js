export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Alvéole: E-comm REST API",
      version: "1.0.0",
      description:
        "A RESTful e-commerce backend inspired by European bakeries using Express.js, Node.js, and PostgreSQL as the data layer.",
    },
    servers: [
      {
        url: "http://localhost:3000", // change if you're using another port or domain
      },
    ],
  },
  apis: ["./routes/*.js"], // adjust path to where your route files are located
};
