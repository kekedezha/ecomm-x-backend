export const swaggerOptions = {
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
        url: "http://localhost:3000", // update when using another port or domain
      },
    ],
    components: {
      securitySchemas: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      parameters: {
        ProductIdParam: {
          name: "productId",
          in: "path",
          description: "The ID of the product",
          required: true,
          schema: {
            type: "integer",
            minimum: 0,
            example: 3,
          },
        },
      },
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            stock: { type: "integer" },
            category_id: { type: "integer" },
          },
          example: {
            id: 1,
            name: "Baguette",
            description: "Long, thin type of bread of French origin.",
            price: 6.99,
            stock: 50,
            category_id: 1,
          },
        },
        NewProduct: {
          type: "object",
          properties: {
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            stock: { type: "integer" },
            category_id: { type: "integer" },
          },
          example: {
            name: "Baguette",
            description: "Long, thin type of bread of French origin.",
            price: 6.99,
            stock: 50,
            category_id: 1,
          },
        },
        CreatedProduct: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            stock: { type: "integer" },
            category_id: { type: "integer" },
            created_at: { type: "string" },
          },
          example: {
            id: 1,
            name: "Donut",
            description: "Fried dough with icing and toppings.",
            price: 2.99,
            stock: 50,
            category_id: 2,
            created_at: "2025-03-27 11:12:51.008486",
          },
        },
        UpdatedProduct: {
          type: "object",
          properties: {
            name: { type: "string", required: false },
            description: { type: "string", required: false },
            price: { type: "number", required: false },
            stock: { type: "integer", required: false },
            category_id: { type: "integer", required: false },
          },
          example: {
            stock: 500,
          },
        },
        AllProducts: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Product",
          },
          example: [
            {
              id: 1,
              name: "Baguette",
              description: "Long, thin type of bread of French origin.",
              price: 6.99,
              stock: 50,
              category_id: 1,
            },
            {
              id: 2,
              name: "Sourdough Loaf",
              description:
                "Naturally leavened bread made with a fermented starter containing wild yeast and bacteria, resulting in a tangy flavor and chewy texture.",
              price: 5.99,
              stock: 50,
              category_id: 1,
            },
          ],
        },
        InternalServerError: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
          example: {
            error: "Internal Server Error.",
          },
        },
        MissingToken: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
          example: {
            error: "Missing token.",
          },
        },
        Unauthorized: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
          example: {
            error: "'Invalid token.' OR 'Access denied.'",
          },
        },
        UnauthorizedRole: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
          example: {
            error: "Access denied.",
          },
        },
        UnauthorizedUser: {
          type: "object",
          properties: {
            error: { type: "string" },
          },
          example: {
            error:
              "User is not authorized to view user information that is not one's self.",
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.js"],
};
