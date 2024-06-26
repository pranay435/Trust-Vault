const { client, client2 } = require("../configs/database");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cryptoJs = require("crypto-js");
const { emailtemplate4 } = require("../assets/htmlvars");

exports.email = async (req, res) => {
  const { email } = req.body;
  //verify moblenumber exist in database or not

  //if exists then follow below code

  const otp = Math.floor(Math.random() * (99999 - 10000 + 1) + 100000);
  //   console.log(otp);
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TrustVaultUsername,
      pass: process.env.TrustVaultPassword,
    },
  });

  let htmlcontent = emailtemplate4.replace("{{otp}}", otp);

  let details = {
    from: process.env.TrustVaultUsername,
    to: email,
    subject: "OTP Verification",
    html: htmlcontent,
  };

  mailTransporter.sendMail(details, async (err) => {
    if (err) {
      console.log(err);
      console.log("There is an error");
      res.status(401).json({
        error: "Enter a valid mail(has @ . com etc..)",
      });
    } else {
      console.log("Email has been sent");
      await client.query(
        `INSERT INTO otps (email,otp) VALUES ('${email}','${otp}');`
      );

      var o_id = await client.query(
        `SELECT MAX(o_id) FROM otps WHERE email = '${email}';`
      );

      o_id = o_id.rows[0].max;

      const token = jwt.sign(
        {
          o_id: o_id,
        },
        process.env.Secret_key
      );

      res.status(200).json({
        message: "OTP sent Sucessfully",
        token: token,
      });
    }
  });
};

exports.otpVerify = (req, res) => {
  const token = req.headers.authorization;
  const inp_otp = req.body.otp;
  // const v_id = req.params.v_id;
  const v_id = req.body.v_id;

  jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
    if (err) {
      console.log(err);
      res.status(500).json({
        error: "Internal Server Occurred",
      });
    }

    const o_id = decoded.o_id;

    let otp = await client.query(
      `SELECT otp FROM otps WHERE o_id = '${o_id}';`
    );
    otp = otp.rows[0].otp;
    // console.log(otp);

    let description = await client.query(
      `SELECT description FROM vaults WHERE v_id = ${v_id};`
    );
    description = description.rows[0].description;

    if (otp === inp_otp) {
      res.status(200).json({
        message: "Success",
        description: description,
      });
    } else {
      res.status(401).json({
        error: "Entered Incorrect OTP please enter again",
      });
    }
  });
};

exports.vaultData = async (req, res) => {
  const { vault_secret_key, v_id } = req.body;

  try {
    let server_key = await client2.query(
      `SELECT * FROM server_keys WHERE s_id = 1;`
    );
    server_key = server_key.rows[0].key;

    let final_key = server_key + vault_secret_key + process.env.PEPPER;
    final_key = cryptoJs.SHA3(final_key);
    final_key = final_key.toString(cryptoJs.enc.Hex);

    let vault_data = await client.query(
      `SELECT * FROM vaults WHERE v_id = '${v_id}';`
    );
    vault_data = vault_data.rows[0];
    vault_data = vault_data.data;

    vault_data = cryptoJs.AES.decrypt(vault_data, final_key);
    vault_data = vault_data.toString(cryptoJs.enc.Utf8);

    if (vault_data === "") {
      res.status(401).json({
        error: "Wrong Secret Key Entered",
      });
    } else {
      res.status(200).json({
        vault_data: vault_data,
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database Error Occurred",
    });
  }
};

//in email function sends the otp to mail

//now user enters the otp now if it is correct vault_key description will be sent as a response(otpVerify)

//now user enters vault_secret_key if it is correct then we return vault_data

//Is making jwt token verification as a middleware before vaultData function runs necessary??
