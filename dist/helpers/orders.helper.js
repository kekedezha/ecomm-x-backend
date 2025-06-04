'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.doesOrderExistForUser = void 0;
var _db = _interopRequireDefault(require('../config/db'));
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
// Function to check if the order_id exists for the user requesting it
const doesOrderExistForUser = async (userId, orderId) => {
  try {
    const result = await _db.default.query(
      'SELECT * FROM orders WHERE user_id = $1 AND id = $2',
      [userId, orderId],
    );
    if (result.rows.length == 0) {
      return false;
    }
    return true;
  } catch (error) {
    console.log('Error checking if order exists for user.', error);
    throw error;
  }
};
exports.doesOrderExistForUser = doesOrderExistForUser;
