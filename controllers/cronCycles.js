const { client } = require("../configs/database");
const bcrypt = require("bcrypt");

exports.statusCheck = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await client.query(
      `SELECT * FROM users WHERE email = '${email}';`
    );
    if (!data.rowCount) {
      res.status(401).json({
        error: "Wrong Email!!!",
      });
    } else {
      const hash = data.rows[0].password;
      const valid = await bcrypt.compare(password, hash);
      if (valid) {
        await client.query(
          `UPDATE users SET last_login_time = CURRENT_TIMESTAMP WHERE email = '${email}';`
        );
        res.status(200).json({
          message: "Succefully Status Verified",
        });
      } else {
        res.status(401).json({
          error: "Wrong Password!!!",
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Server Error Occurred",
    });
  }
};
