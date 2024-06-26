const jwt = require("jsonwebtoken");
const { client, client2 } = require("../configs/database");

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  // console.log(token);
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(400).json({
        error: "Server Error Occurred From Middleware",
      });
    }
    // console.log(decoded.email);
    const userEmail = decoded.email;

    client
      .query(`SELECT * FROM users WHERE email = '${userEmail}';`)
      .then((data) => {
        isValid = data.rows;

        if (isValid.length === 0) {
          res.status(400).json({ message: "Invalid Token" });
        } else {
          req.email = userEmail;
          req.uid = isValid[0].u_id;
          next();
        }
      })
      .catch((err) => {
        res.status(500).json({
          error: "Database error occurred!!",
        });
      });
  });
};
