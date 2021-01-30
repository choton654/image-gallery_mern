const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(400).json({ msg: "no token, authorization denide" });
  }

  try {
    const decode = jwt.verify(token, "secret");
    req.user = decode.user;
    next();
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ msg: "Token is not valid" });
  }
};
