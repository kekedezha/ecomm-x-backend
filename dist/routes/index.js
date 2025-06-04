'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;
var _users = _interopRequireDefault(require('./users'));
var _products = _interopRequireDefault(require('./products'));
var _payments = _interopRequireDefault(require('./payments'));
var _orders = _interopRequireDefault(require('./orders'));
var _categories = _interopRequireDefault(require('./categories'));
var _carts = _interopRequireDefault(require('./carts'));
var _checkout = _interopRequireDefault(require('./checkout'));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
var _default = (exports.default = {
  users: _users.default,
  products: _products.default,
  payments: _payments.default,
  orders: _orders.default,
  categories: _categories.default,
  carts: _carts.default,
  checkout: _checkout.default,
});
