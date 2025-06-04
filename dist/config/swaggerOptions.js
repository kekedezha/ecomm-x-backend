'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.swaggerOptions = void 0;
const swaggerOptions = (exports.swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Alvéole: E-comm REST API',
      version: '1.0.0',
      description:
        'A RESTful e-commerce backend inspired by European bakeries using Express.js, Node.js, and PostgreSQL as the data layer.',
    },
    servers: [
      {
        url: 'http://localhost:3000', // update when using another port or domain
      },
    ],
    components: {
      securitySchemas: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      parameters: {
        UserIdParam: {
          name: 'userId',
          in: 'path',
          description: 'The ID of the user',
          required: true,
          schema: {
            type: 'integer',
            minimum: 0,
            example: 2,
          },
        },
        ProductIdParam: {
          name: 'productId',
          in: 'path',
          description: 'The ID of the product',
          required: true,
          schema: {
            type: 'integer',
            minimum: 0,
            example: 3,
          },
        },
        CategoryIdParam: {
          name: 'categoryId',
          in: 'path',
          description: 'The ID of the category',
          required: true,
          schema: {
            type: 'integer',
            minimum: 0,
            example: 2,
          },
        },
        OrderIdParam: {
          name: 'orderId',
          in: 'path',
          description: 'The ID of the order',
          required: true,
          schema: {
            type: 'integer',
            minimum: 0,
            example: 52,
          },
        },
      },
      schemas: {
        CartItem: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            cart_id: {
              type: 'integer',
            },
            product_id: {
              type: 'integer',
            },
            quantity: {
              type: 'integer',
            },
          },
          example: {
            id: 99,
            cart_id: 45,
            product_id: 3,
            quantity: 6,
          },
        },
        CartItems: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/CartItem',
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
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            deletedProducts: {
              type: 'array',
            },
          },
          example: {
            message: 'Successfully deleted all products from cart.',
            deletedProducts: [
              {
                id: 367,
                cart_id: 2,
                product_id: 6,
                quantity: 2,
              },
              {
                id: 366,
                cart_id: 2,
                product_id: 5,
                quantity: 3,
              },
            ],
          },
        },
        DeletedItemFromCart: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            deletedProduct: {
              type: 'object',
            },
          },
          example: {
            message: 'Successfully deleted product from cart.',
            deletedProduct: {
              id: 367,
              cart_id: 2,
              product_id: 6,
              quantity: 2,
            },
          },
        },
        UpdatedCart: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            updatedProduct: {
              type: 'object',
            },
          },
          example: {
            message: 'Successfully updated quantity of product.',
            updatedProduct: {
              id: 367,
              cart_id: 2,
              product_id: 6,
              quantity: 2,
            },
          },
        },
        NewCartItem: {
          type: 'object',
          properties: {
            productId: {
              type: 'integer',
            },
            quantity: {
              type: 'integer',
            },
          },
          example: {
            productId: 3,
            quantity: 2,
          },
        },
        NewCartItemsResponse: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            addedProduct: {
              type: 'object',
            },
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
          type: 'object',
          properties: {
            orderId: {
              type: 'integer',
              required: true,
            },
            amount: {
              type: 'number',
              required: true,
            },
            paymentMethod: {
              type: 'string',
              required: true,
            },
          },
          example: {
            orderId: 99,
            amount: 29.48,
            paymentMethod: 'CREDIT CARD',
          },
        },
        Category: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
          },
          example: {
            id: 1,
            name: 'Bread',
          },
        },
        GetProdsByCategory: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            products: {
              type: 'array',
            },
          },
          example: {
            message: 'Successfully retrieved products.',
            products: [
              {
                name: 'Sourdough Loaf',
                description:
                  'Naturally leavened bread made with a fermented starter containing wild yeast and bacteria, resulting in a tangy flavor and chewy texture.',
                price: '5.99',
                stock: 50,
                category_id: 1,
              },
              {
                name: 'Baguette',
                description: 'Long, thin type of bread of French origin.',
                price: '6.99',
                stock: 46,
                category_id: 1,
              },
            ],
          },
        },
        UpdateCategory: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            updatedCategory: {
              type: 'object',
            },
          },
          example: {
            message: 'Successfully updated category name.',
            updatedCategory: {
              id: 1,
              name: 'Sweet Treat',
            },
          },
        },
        DeletedCategory: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            updatedCategory: {
              type: 'object',
            },
          },
          example: {
            message: 'Successfully deleted category.',
            deletedCategory: {
              id: 8,
              name: 'Sweet Treat',
            },
          },
        },
        NewCategory: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            new_category: {
              type: 'object',
            },
          },
          example: {
            message: 'Successfully created new category.',
            new_category: {
              id: 8,
              name: 'Sweet Treat',
            },
          },
        },
        AllCategories: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Category',
          },
          example: [
            {
              id: 1,
              name: 'Bread',
            },
            {
              id: 2,
              name: 'Cookie',
            },
            {
              id: 3,
              name: 'Pastry',
            },
            {
              id: 4,
              name: 'Tart',
            },
          ],
        },
        Order: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            user_id: {
              type: 'integer',
            },
            total_price: {
              type: 'number',
            },
            status: {
              type: 'string',
            },
            created_at: {
              type: 'string',
            },
          },
          example: {
            id: 52,
            user_id: 2,
            total_price: 18.96,
            status: 'PAID',
            created_at: '2025-05-07 15:55:51.790103',
          },
        },
        AllOrders: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Order',
          },
          example: [
            {
              id: 52,
              user_id: 2,
              total_price: 18.96,
              status: 'PAID',
              created_at: '2025-05-07 15:55:51.790103',
            },
            {
              id: 104,
              user_id: 3,
              total_price: 18.96,
              status: 'PAID',
              created_at: '2025-05-08 10:57:59.61105',
            },
            {
              id: 120,
              user_id: 3,
              total_price: 18.96,
              status: 'PAID',
              created_at: '2025-05-19 18:12:03.413663',
            },
          ],
        },
        AllUserOrders: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Order',
          },
          example: [
            {
              id: 52,
              user_id: 2,
              total_price: 18.96,
              status: 'PAID',
              created_at: '2025-05-07 15:55:51.790103',
            },
            {
              id: 104,
              user_id: 2,
              total_price: 21.74,
              status: 'PAID',
              created_at: '2025-05-08 10:57:59.61105',
            },
            {
              id: 120,
              user_id: 2,
              total_price: 13.47,
              status: 'PAID',
              created_at: '2025-05-21 18:12:03.413663',
            },
          ],
        },
        UpdatedOrder: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            updatedOrder: {
              type: 'object',
            },
          },
          example: {
            message: 'Successfully updated status of order.',
            deletedOrder: {
              id: 52,
              user_id: 2,
              total_price: 20.75,
              status: 'READY FOR PICK-UP',
              created_at: '2025-05-08 10:57:59.61105',
            },
          },
        },
        DeletedOrder: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            deletedOrder: {
              type: 'object',
            },
          },
          example: {
            message: 'Successfully deleted order.',
            deletedOrder: {
              id: 403,
              user_id: 2,
              total_price: 20.75,
              status: 'PAID',
              created_at: '2025-05-08 10:57:59.61105',
            },
          },
        },
        Product: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            price: {
              type: 'number',
            },
            stock: {
              type: 'integer',
            },
            category_id: {
              type: 'integer',
            },
          },
          example: {
            id: 1,
            name: 'Baguette',
            description: 'Long, thin type of bread of French origin.',
            price: 6.99,
            stock: 50,
            category_id: 1,
          },
        },
        NewProduct: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              required: true,
            },
            description: {
              type: 'string',
              required: true,
            },
            price: {
              type: 'number',
              required: true,
            },
            stock: {
              type: 'integer',
              required: true,
            },
            category_id: {
              type: 'integer',
              required: true,
            },
          },
          example: {
            name: 'Baguette',
            description: 'Long, thin type of bread of French origin.',
            price: 6.99,
            stock: 50,
            category_id: 1,
          },
        },
        CreatedProduct: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            product: {
              type: 'object',
            },
          },
          example: {
            message: 'Successfully created new product!',
            product: {
              id: 1,
              name: 'Donut',
              description: 'Fried dough with icing and toppings.',
              price: 2.99,
              stock: 50,
              category_id: 2,
              created_at: '2025-03-27 11:12:51.008486',
            },
          },
        },
        UpdatedProduct: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              required: false,
            },
            description: {
              type: 'string',
              required: false,
            },
            price: {
              type: 'number',
              required: false,
            },
            stock: {
              type: 'integer',
              required: false,
            },
            category_id: {
              type: 'integer',
              required: false,
            },
          },
          example: {
            stock: 500,
          },
        },
        AllProducts: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Product',
          },
          example: [
            {
              id: 1,
              name: 'Baguette',
              description: 'Long, thin type of bread of French origin.',
              price: 6.99,
              stock: 50,
              category_id: 1,
            },
            {
              id: 2,
              name: 'Sourdough Loaf',
              description:
                'Naturally leavened bread made with a fermented starter containing wild yeast and bacteria, resulting in a tangy flavor and chewy texture.',
              price: 5.99,
              stock: 50,
              category_id: 1,
            },
          ],
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
            },
            username: {
              type: 'string',
            },
            email: {
              type: 'string',
            },
            password: {
              type: 'string',
            },
            first_name: {
              type: 'string',
            },
            last_name: {
              type: 'string',
            },
            address: {
              type: 'string',
            },
            created_at: {
              type: 'string',
            },
          },
          example: {
            id: 2,
            username: 'billybob',
            email: 'billyb@gmail.com',
            password:
              '$2b$11$rHowWbwkyFdcl4hEGLvE3eAv5uFU9DlQ4EOywnbwG5D5kR7mHAdQW',
            first_name: 'Billy',
            last_name: 'Robert',
            address: 'Houston, TX',
            created_at: '2025-04-08 11:13:10.319366',
          },
        },
        NewUser: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              required: true,
            },
            email: {
              type: 'string',
              required: true,
            },
            password: {
              type: 'string',
              required: true,
            },
            firstName: {
              type: 'string',
              required: true,
            },
            lastName: {
              type: 'string',
              required: true,
            },
            address: {
              type: 'string',
              required: false,
            },
          },
          example: {
            username: 'bbob',
            email: 'billyb@gmail.com',
            password: 'averyweakpassword',
            firstName: 'Billy',
            lastName: 'Bob',
            address: 'Miami, FL',
          },
        },
        UserLogin: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              required: false,
            },
            email: {
              type: 'string',
              required: false,
            },
            password: {
              type: 'string',
              required: true,
            },
          },
          example: {
            username: 'bbob',
            password: 'averyweakpassword',
          },
        },
        RegisteredUser: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            user: {
              type: 'object',
            },
            token: {
              type: 'string',
            },
          },
          example: {
            message: 'Successfully created new user!',
            user: {
              id: 2,
              username: 'bbob',
              first_name: 'Billy',
            },
            token:
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNzA4MzQ1MTIzLCJleHAiOjE3MDgzNTUxMjN9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
          },
        },
        AllUsers: {
          type: 'array',
          items: {
            $ref: '#/components/schemas/Product',
          },
          example: [
            {
              id: 2,
              username: 'billybob',
              email: 'billyb@gmail.com',
              password:
                '$2b$11$rHowWbwkyFdcl4hEGLvE3eAv5uFU9DlQ4EOywnbwG5D5kR7mHAdQW',
              first_name: 'Billy',
              last_name: 'Bob',
              address: 'Miami, FL',
              created_at: '2025-04-08 11:13:10.319366',
            },
            {
              id: 5,
              username: 'johndoe',
              email: 'jdoe@gmail.com',
              password:
                '$2b$11$rHoasdfwkyFdcl4hEGLvE3eAv5uFU9DlQ4EOywnbwG5D5kR7mHAdQW',
              first_name: 'John',
              last_name: 'Doe',
              address: 'Los Angeles, CA',
              created_at: '2025-08-04 01:54:10.319366',
            },
            {
              id: 6,
              username: 'sarraam',
              email: 'saram8@gmail.com',
              password:
                '$2b$11$rHowWbwkyFdcl4hEGLvE3eAv5uFU9Dasd8EOywnbwG5D5kR7mHAdQW',
              first_name: 'Sara',
              last_name: 'Miller',
              address: 'New York, NY',
              created_at: '2025-06-12 09:17:10.319366',
            },
            {
              id: 0,
              username: '...',
              email: '...',
              password: '...',
              first_name: '...',
              last_name: '..',
              address: '...',
              created_at: '...',
            },
            {
              id: 98,
              username: 'bruceyb',
              email: 'batman@gmail.com',
              password:
                '$2b$11$rHowWbwkyFdcl4hEGLvE3eAv5uFU9DlQ4asdf0wnbwG5D5kR7mHAdQW',
              first_name: 'Bruce',
              last_name: 'Wayne',
              address: 'Gotham, NY',
              created_at: '2025-01-22 09:33:10.319366',
            },
          ],
        },
        UserUpdates: {
          type: 'object',
          properties: {
            username: {
              type: 'string',
              required: false,
            },
            email: {
              type: 'string',
              required: false,
            },
            password: {
              type: 'string',
              required: false,
            },
            first_name: {
              type: 'string',
              required: false,
            },
            last_name: {
              type: 'string',
              required: false,
            },
            address: {
              type: 'string',
              required: false,
            },
          },
          example: {
            last_name: 'Robert',
          },
        },
        UpdatedUser: {
          type: 'object',
          example: {
            id: 2,
            username: 'bbob',
            email: 'billyb@gmail.com',
            password:
              '$2b$11$rHowWbwkyFdcl4hEGLvE3eAv5uFU9DlQ4EOywnbwG5D5kR7mHAdQW',
            first_name: 'Billy',
            last_name: 'Robert',
            address: 'Miami, FL',
            created_at: '2025-04-08 11:13:10.319366',
          },
        },
        DeletedUser: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
            },
            deletedUser: {
              type: 'object',
            },
          },
          example: {
            message: 'Successfully deleted user.',
            deletedUser: {
              id: 2,
              username: 'bbob',
              email: 'billyb@gmail.com',
              password:
                '$2b$11$rHowWbwkyFdcl4hEGLvE3eAv5uFU9DlQ4EOywnbwG5D5kR7mHAdQW',
              first_name: 'Billy',
              last_name: 'Bob',
              address: 'Miami, FL',
              created_at: '2025-04-08 11:13:10.319366',
            },
          },
        },
        InternalServerError: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
          },
          example: {
            error: 'Internal Server Error.',
          },
        },
        MissingToken: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
          },
          example: {
            error: 'Missing token.',
          },
        },
        Unauthorized: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
          },
          example: {
            error: "'Invalid token.' OR 'Access denied.'",
          },
        },
        UnauthorizedRole: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
          },
          example: {
            error: 'Access denied.',
          },
        },
        UnauthorizedUser: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
            },
          },
          example: {
            error:
              "User is not authorized to view user information that is not one's self.",
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
});
