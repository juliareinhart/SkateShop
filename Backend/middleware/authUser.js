const jwt = require("jsonwebtoken");

let authUser = (req, res, next) => {
  const authHeader = req.header("authorization");

  if (!authHeader) {
    return res
      .status(401)
      .send("Access denied. No authorization token provided!");
  }

  const authArray = authHeader.split(" ");

  if (authArray[0] !== "Bearer") {
    return res.status(401).send("Access denied. Authorization type invalid!");
  }

  const token = authArray[1];

  try {
    const payLoad = jwt.verify(token, "12345678"); // Replace "12345678" with your secure SECRET_KEY
    req.user = payLoad; // Attach the decoded payload to req.user
    next(); // Move to the next middleware or route handler
  } catch (error) {
    return res.status(401).send("Access denied. Invalid token!");
  }
};

module.exports = authUser;
