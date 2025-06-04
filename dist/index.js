'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;
var _express = _interopRequireDefault(require('express'));
var _cors = _interopRequireDefault(require('cors'));
var _index = _interopRequireDefault(require('./routes/index.js'));
var _swaggerJsdoc = _interopRequireDefault(require('swagger-jsdoc'));
var _swaggerUiExpress = require('swagger-ui-express');
var _swaggerOptions = require('./config/swaggerOptions.js');
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
// Import express module from express package
// Import CORS module from CORS package
// Import routes/end points

const app = (0, _express.default)(); // Create instance of an Express application
const swaggerSpec = (0, _swaggerJsdoc.default)(_swaggerOptions.swaggerOptions); // create instance of swagger-tools specification from swagger options setup

app.use((0, _cors.default)()); // initialize basic CORS config
app.use(_express.default.json()); //parse JSON request bodies
app.use(
  _express.default.urlencoded({
    extended: true,
  }),
); // parse URL-encoded data (e.g. from form submissions)
app.use('/carts', _index.default.carts); // prefix for 'carts' routes
app.use('/categories', _index.default.categories); // prefix for 'categories' routes
app.use('/checkout', _index.default.checkout); // prefix for 'checkout' routes
app.use('/orders', _index.default.orders); // prefix for 'orders' routes
app.use('/payments', _index.default.payments); // prefix for 'payments' routes
app.use('/products', _index.default.products); // prefix for 'products' routes
app.use('/users', _index.default.users); // prefix for 'users' routes
app.use(
  '/api-docs',
  _swaggerUiExpress.serve,
  (0, _swaggerUiExpress.setup)(swaggerSpec),
);
app.get('/', (req, res) => {
  res.send(
    'Welcome to the home route for the backend REST API for X fitness brand.',
  );
});
var _default = (exports.default = app); // Export app without starting the server
// Benefits of this approach:
// 1. Prevents Server from Auto-Starting in Tests
//    - Tests don't accidentally start the server when requiring the app.
// 2. Enables Better Testing
//    - You can import app for testing while keeping server.js for production
// 3. Allows Clean Shutdown
//    - You can close the server after tests to free up sources.
