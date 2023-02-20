const CustomAPIError = require('./customApi');
const UnauthenticatedError = require('./unauthenticated');
const NotFoundError = require('./notFound');
const BadRequestError = require('./badRequest');
const InternalServerError = require('./internalError');

module.exports = {
  CustomAPIError,
  UnauthenticatedError,
  NotFoundError,
  BadRequestError,
  InternalServerError,
}
