const response = require('./responseMsg');

const errorResponse = (res, error) => {
  let message = '';
  if (error.code === 'P2002' && error.meta.target[0] === 'email') {
    message = 'Email already taken by other users.';
  } else if (error.code === 'P2002' && error.meta.target[0] === 'phoneNumber') {
    message = 'Phone number already taken by other users.';
  }
  return response(res, message);
};
module.exports = errorResponse;
