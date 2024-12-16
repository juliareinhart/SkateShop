const jwt = require("jsonwebtoken");

let authUser = (req, res, next) => {
  // Read the Authorization header of the request
  // Authorization: <type> <token>
  // Authroization: Bearer <jwk>

  const authHeader = req.header("authorization");

  if (!authHeader) {
    res.status(401).send("Access denied. No authorization token provided!");
  }

  const authArray = authHeader.split(" ");

  if (authArray[0] != "Bearer") {
    res.status(401).send("Access denied. Authorization type invalid");
  }

  const token = authArray[1];

  try {
    const payLoad = jwt.verify(token, "12345678");
    req.user = payLoad;
    next();
  } catch {
    res.status(401).send("Access denied. Invalid token!");
  }
};

module.exports = authUser;
