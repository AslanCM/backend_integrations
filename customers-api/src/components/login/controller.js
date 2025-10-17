const { loginService } = require("./service");

async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    const result = await loginService(email?.trim()?.toLowerCase(), password.trim());

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status).send(error);
  }
}

module.exports = {
  loginController,
};
