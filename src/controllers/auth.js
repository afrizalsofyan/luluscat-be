const userModel = require('../models/user');
const response = require('../helpers/responseMsg');
const errorResponse = require('../helpers/errorResponse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  try {
    if (req.body.status) {
      req.body.status = parseInt(req.body.status, 10);
    }
    await userModel.createNewUser(req.body);
    return response(res, 'success for registered account.');
  } catch (error) {
    console.log(error);
    // return response(res, 'Any problems.', error.message);
    return errorResponse(res, error);
  }
};

exports.login = async (req, res) => {
  try {
    const data = {};
    if (req.body.email) {
      data.email = req.body.email;
    } else if (req.body.phoneNumber) {
      data.phoneNumber = req.body.phoneNumber;
    }
    const user = await userModel.getUserByEmailOrPhoneOrId(data);
    if (!user) {
      return response(res, 'account not found', null, null, 400);
    } else {
      const passValid = await bcrypt.compare(
        req.body.passwordUser,
        user.password
      );
      if (passValid) {
        const secretKeyApp = process.env.SECRET_APP_KEY;
        const token = jwt.sign(
          { id: user.id, email: user.email },
          secretKeyApp || '1u1u5C4t1nT3k',
          { expiresIn: '2h' }
        );
        const refreshToken = jwt.sign(
          { id: user.id, email: user.email },
          secretKeyApp || '1u1u5C4t1nT3k'
        );
        return response(res, 'login success', {
          id: user.id,
          token,
          refreshToken,
        });
      } else {
        let msg = '';
        if (data.email) {
          msg = 'email or password incorrect';
        } else if (data.phoneNumber) {
          msg = 'phone or password incorrect';
        }
        return response(res, msg, null, null, 400);
      }
    }
  } catch (error) {
    return response(res, 'any problem when login', error);
  }
};
