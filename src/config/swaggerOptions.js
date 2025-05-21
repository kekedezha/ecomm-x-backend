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
        UserIdParam: {
          name: "userId",
          in: "path",
          description: "The ID of the user",
          required: true,
          schema: {
            type: "integer",
            minimum: 0,
            example: 5,
          },
        },
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
        CategoryIdParam: {
          name: "categoryId",
          in: "path",
          description: "The ID of the category",
          required: true,
          schema: {
            type: "integer",
            minimum: 0,
            example: 2,
          },
        },
      },
      schemas: {
        CartItem: {
          type: "object",
          properties: {
            id: { type: "integer" },
            cart_id: { type: "integer" },
            product_id: { type: "integer" },
            quantity: { type: "integer" },
          },
          example: {
            id: 99,
            cart_id: 45,
            product_id: 3,
            quantity: 6,
          },
        },
        CartItems: {
          type: "array",
          items: {
            $ref: "#/components/schemas/CartItem",
          },
          example: [
            {
              id: 101,
              cart_id: 88,
              product_id: 3,
              quantity: 1,
            },
            {
              id: 102,
              cart_id: 88,
              product_id: 4,
              quantity: 3,
            },
            {
              id: 103,
              cart_id: 88,
              product_id: 7,
              quantity: 2,
            },
          ],
        },
        ClearCart: {
          type: "object",
          properties: {
            message: { type: "string" },
            deletedProducts: { type: "array" },
          },
          example: {
            message: "Successfully deleted all products from cart.",
            deletedProducts: [
              { id: 367, cart_id: 2, product_id: 6, quantity: 2 },
              { id: 366, cart_id: 2, product_id: 5, quantity: 3 },
            ],
          },
        },
        DeletedItemFromCart: {
          type: "object",
          properties: {
            message: { type: "string" },
            deletedProduct: { type: "object" },
          },
          example: {
            message: "Successfully deleted product from cart.",
            deletedProduct: { id: 367, cart_id: 2, product_id: 6, quantity: 2 },
          },
        },
        UpdatedCart: {
          type: "object",
          properties: {
            message: { type: "string" },
            updatedProduct: { type: "object" },
          },
          example: {
            message: "Successfully updated quantity of product.",
            updatedProduct: { id: 367, cart_id: 2, product_id: 6, quantity: 2 },
          },
        },
        NewCartItem: {
          type: "object",
          properties: {
            productId: { type: "integer" },
            quantity: { type: "integer" },
          },
          example: {
            productId: 3,
            quantity: 2,
          },
        },
        NewCartItemsResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            addedProduct: { type: "object" },
          },
          example: {
            message:
              "'Successfully added new product to cart.' OR 'Successfully added product to cart.'",
            addedProduct: {
              id: 101,
              cart_id: 88,
              product_id: 3,
              quantity: 1,
            },
          },
        },
        CheckoutOrder: {
          type: "object",
          properties: {
            orderId: { type: "integer", required: true },
            amount: { type: "number", required: true },
            paymentMethod: { type: "string", required: true },
          },
          example: {
            orderId: 99,
            amount: 29.48,
            paymentMethod: "CREDIT CARD",
          },
        },
        Category: {
          type: "object",
          properties: {
            id: { type: "integer" },
            name: { type: "string" },
          },
          example: {
            id: 1,
            name: "Bread",
          },
        },
        GetProdsByCategory: {
          type: "object",
          properties: {
            message: { type: "string" },
            products: { type: "array" },
          },
          example: [
            {
              name: "Sourdough Loaf",
              description:
                "Naturally leavened bread made with a fermented starter containing wild yeast and bacteria, resulting in a tangy flavor and chewy texture.",
              price: "5.99",
              stock: 50,
              category_id: 1,
            },
            {
              name: "Baguette",
              description: "Long, thin type of bread of French origin.",
              price: "6.99",
              stock: 46,
              category_id: 1,
            },
          ],
        },
        AllCategories: {
          type: "array",
          items: {
            $ref: "#/components/schemas/Category",
          },
          example: [
            {
              id: 1,
              name: "Bread",
            },
            {
              id: 2,
              name: "Cookie",
            },
            {
              id: 3,
              name: "Pastry",
            },
            {
              id: 4,
              name: "Tart",
            },
          ],
        },
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
            name: { type: "string", required: true },
            description: { type: "string", required: true },
            price: { type: "number", required: true },
            stock: { type: "integer", required: true },
            category_id: { type: "integer", required: true },
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
            message: { type: "string" },
            product: { type: "object" },
          },
          example: {
            message: "Successfully created new product!",
            product: {
              id: 1,
              name: "Donut",
              description: "Fried dough with icing and toppings.",
              price: 2.99,
              stock: 50,
              category_id: 2,
              created_at: "2025-03-27 11:12:51.008486",
            },
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
