'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true,
});
exports.default = void 0;
var _index = _interopRequireDefault(require('./index.js'));
require('dotenv/config');
function _interopRequireDefault(e) {
  return e && e.__esModule ? e : { default: e };
}
// Import Express app
// Initialize .env variables from .env file

const server = _index.default.listen(process.env.PORT, () => {
  console.log(
    `Listening on port ${process.env.PORT}! Initial set up for backend server.`,
  );
});
var _default = (exports.default = server); // Export the server for testing cleanup
