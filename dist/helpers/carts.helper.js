'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.isProductInCart = void 0;
var _db = _interopRequireDefault(require('../config/db'));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
// function to check if a cart has the product
const isProductInCart = async (cartId, productId) => {
  try {
    const result = await _db.default.query(
      'SELECT * from cart_items WHERE cart_id = $1 AND product_id = $2',
      [cartId, productId],
    );
    if (result.rows.length == 0) {
      return null;
    }
    return parseInt(result.rows[0].quantity, 10);
  } catch (error) {
    console.log('Error checking products in cart: ', error);
    throw error;
  }
};
exports.isProductInCart = isProductInCart;
