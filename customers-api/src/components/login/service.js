const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dbPool = require('dbConection-lib');
const { handlerError } = require('../../lib/logger');

async function loginService(email, password) {
  try {
    const [result] = await dbPool.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = result[0];

    if (!user) {
      throw handlerError(
        107,
        "Invalid email or password",
        404,
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      throw handlerError(
        107,
        "Invalid email or password",
        404,
      );
    }

    delete user.password_hash;
    return {
      user,
      token: jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '5h' }),
    };
  } catch (error) {
    throw handlerError(
      error?.message?.code ?? 106,
      error.message?.detail ?? "Internal server error",
      error?.status ?? 500,
    );
  }
}

module.exports = {
  loginService,
};
