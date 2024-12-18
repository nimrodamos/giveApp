const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

function authUser(req, res, next) {
  try {
    let token;
    let decoded;

    if (req.headers.authorization) {
      const [type, credentials] = req.headers.authorization.split(" ");
      if (type === "Bearer") {
        token = credentials;
      }
    }

    if (!token && req.headers.cookie) {
      const cookies = cookieParser.JSONCookie(req.headers.cookie);
      token = cookies.jwt;
    }

    if (!token) {
      return res
        .status(401)
        .json({ message: "Session expired. Please log in again." });
    }

    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token." });
    }

    req.user = decoded.user;
    console.log("authUser says: request by user:", decoded.user);
    next();
  } catch (error) {
    console.error("authUser error:", error.message);
    res.status(500).json({ message: "Internal server error." });
  }
}

module.exports = authUser;
