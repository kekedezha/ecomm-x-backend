import app from '../../../src/index';
import supertest from 'supertest';
import pool from '../../../src/config/dbTest';
import 'dotenv/config';

const requestWithSupertest = supertest(app);
let adminLogin;
let adminToken;
let userLogin;
let userToken;
let productId;

beforeAll(async () => {
  // Login with admin role to use throughout admin/protected routes
  adminLogin = await requestWithSupertest.post('/users/login').send({
    email: 'dezha6@hotmail.com',
    password: process.env.ADMIN_PASSWORD,
  });
  adminToken = adminLogin.body.token;

  // Login with user role to use throughout protected routes
  userLogin = await requestWithSupertest
    .post('/users/login')
    .send({ email: 'yuki@gmail.com', password: process.env.YUKI_PASSWORD });
  userToken = userLogin.body.token;
});

describe('Products endpoints', () => {
  // GET REQUEST TESTS
  describe('GET HTTP method to retrieve all products', () => {
    it('GET /products should show all products from db', async () => {
      const res = await requestWithSupertest.get('/products');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            id: expect.any(Number),
            name: expect.any(String),
            description: expect.any(String),
            price: expect.any(String),
            stock: expect.any(Number),
            category_id: expect.any(Number),
          }),
        ]),
      );
    });
  });

  describe('GET HTTP method to retrieve one single product', () => {
    it('GET /products/1 should retrieve product with id of 1 which is a baguette', async () => {
      const res = await requestWithSupertest.get('/products/1');
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.id).toEqual(1);
      expect(res.body.name).toEqual('Baguette');
      expect(res.body.description).toEqual(
        'Long, thin type of bread of French origin.',
      );
    });

    it('GET /products/999 should fail to retrieve a product with id of 999', async () => {
      const res = await requestWithSupertest.get('/products/999');
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('Product not found.');
    });

    it('GET /products/bread should fail to retrieve a product with id of bread', async () => {
      const res = await requestWithSupertest.get('/products/bread');
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('Bad Request. Invalid product id.');
    });
  });

  // POST REQUEST TESTS
  describe('POST HTTP method to add a new product to the database', () => {
    it('POST /products/admin should fail to create a new product with invalid user credentials', async () => {
      const res = await requestWithSupertest
        .post('/products/admin')
        .set('Authorization', `Bearer ${userToken}`)
        .send({
          description:
            'Mexican sweet bread. This is a simple test. DELETE LATER',
          price: '4.99',
          stock: '25',
          categoryId: '2',
        });
      expect(res.status).toEqual(403);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('Access denied.');
    });

    it('POST /products/admin should fail to create a new product with insufficient/missing information', async () => {
      const res = await requestWithSupertest
        .post('/products/admin')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          description:
            'Mexican sweet bread. This is a simple test. DELETE LATER',
          price: '4.99',
          stock: '25',
          categoryId: '2',
        });
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual(
        'Bad Request. Missing or invalid product information.',
      );
    });

    it('POST /products/admin should add a new product, a concha', async () => {
      const res = await requestWithSupertest
        .post('/products/admin')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Concha',
          description:
            'Mexican sweet bread. This is a simple test. DELETE LATER',
          price: '4.99',
          stock: '25',
          categoryId: '2',
        });
      productId = parseInt(res.body.product.id, 10);
      expect(res.status).toEqual(201);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.product).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          name: 'Concha',
          description: expect.any(String),
          price: expect.any(String),
          stock: expect.any(Number),
          category_id: expect.any(Number),
          created_at: expect.any(String),
        }),
      );
    });
  });

  // PUT REQUEST TESTS
  describe('PUT HTTP method to update/modify a product from the database', () => {
    it('PUT /products/admin/xx should fail to update with invalid user credentials', async () => {
      const res = await requestWithSupertest
        .put(`/products/admin/${productId}`)
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toEqual(403);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('Access denied.');
    });

    it('PUT /products/admin/999 should fail to update the product because it does not exist in the database', async () => {
      const res = await requestWithSupertest
        .put('/products/admin/999')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Ojo de wey',
        });
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('Product not found.');
    });

    it('PUT /products/admin/test should fail to update because of invalid path/productId', async () => {
      const res = await requestWithSupertest
        .put('/products/admin/test')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Puerco',
        });
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('Invalid product ID.');
    });

    it('PUT /products/admin/xx should fail to update with no information sent over with the request', async () => {
      const res = await requestWithSupertest
        .put(`/products/admin/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('No fields provided for update.');
    });

    it('PUT /products/admin/xx should update the product created in the POST request to /products and update the name be Oreja', async () => {
      const res = await requestWithSupertest
        .put(`/products/admin/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          name: 'Oreja',
        });
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.id).toEqual(productId);
      expect(res.body.name).toEqual('Oreja');
    });
  });

  // DELETE REQUEST TESTS
  describe('DELETE HTTP method to delete a specified product from the database', () => {
    it('DELETE /products/admin/999 should fail to delete a product because user role is not admin', async () => {
      const res = await requestWithSupertest
        .delete('/products/admin/999')
        .set('Authorization', `Bearer ${userToken}`);
      expect(res.status).toEqual(403);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('Access denied.');
    });

    it('DELETE /products/admin/999 should fail to delete a product not found in the database', async () => {
      const res = await requestWithSupertest
        .delete('/products/admin/999')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toEqual(404);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('Product not found.');
    });

    it('PUT /products/admin/test should fail to delete a product with an invalid path/productId', async () => {
      const res = await requestWithSupertest
        .put('/products/admin/test')
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toEqual(400);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.error).toEqual('Invalid product ID.');
    });

    it('DELETE /products/admin/xx should delete the product created by the POST request sent to the /products path from the database', async () => {
      const res = await requestWithSupertest
        .delete(`/products/admin/${productId}`)
        .set('Authorization', `Bearer ${adminToken}`);
      expect(res.status).toEqual(200);
      expect(res.type).toEqual(expect.stringContaining('json'));
      expect(res.body.message).toEqual('Successfully deleted product.');
    });
  });
});

// Ensure db connection pool closes after all the tests to ensure proper teardown and prevent data leaks
afterAll(async () => {
  await pool.end(); // close db connection
});
