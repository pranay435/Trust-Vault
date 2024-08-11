const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { client } = require("../configs/database");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let userData = await client.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    userData = userData.rows;
    if (userData.length !== 0) {
      res.status(409).json({
        error: "User already exists",
      });
    } else {
      //Generate Token
      const token = jwt.sign(
        {
          email: email,
        },
        process.env.SECRET_KEY
      );
      //Hash Password
      bcrypt.hash(password, 10, async (err, hash) => {
        if (err) {
          res.status(500).json({
            error: "Internal server error",
          });
        }

        const user = {
          username,
          email,
          password: hash,
        };

        await client.query(
          `INSERT INTO users (username,email,password,last_login_time) VALUES ('${user.username}','${user.email}','${user.password}',CURRENT_TIMESTAMP);`
        );

        res.status(200).json({
          message: "User Added Succefully",
          token: token,
        });
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database Error Occurred",
    });
  }
};

exports.signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let userData = await client.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    userData = userData.rows;
    if (userData.length == 0) {
      res.status(401).json({
        error: "User doesn't exist, SignUp Instead",
      });
    } else {
      bcrypt.compare(password, userData[0].password, async (err, result) => {
        if (err) {
          res.status(500).json({
            error: "Internal Server Error Occurred",
          });
        } else if (result === true) {
          await client.query(
            `UPDATE users SET last_login_time = CURRENT_TIMESTAMP WHERE u_id = ${userData[0].u_id};`
          );
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );

          res.status(200).json({
            message: "User Signed In Sucessfully",
            token: token,
          });
        } else {
          res.status(401).json({
            error: "Enter correct password!",
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "Database Error Occurred!!",
    });
  }
};
