const { client } = require("../configs/database");
const cron = require("node-cron");
const nodemailer = require("nodemailer");
const {
  emailtemplate,
  emailtemplate2,
  emailtemplate3,
} = require("../assets/htmlvars");

exports.sendMailToUser = (emails) => {
  //   console.log(emails[0].email);
  if (emails) {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.TrustVaultUsername,
        pass: process.env.TrustVaultPassword,
      },
    });
    let newone = emailtemplate2.replace("{{url}}", `http://localhost:3000/`);
    emails.forEach((element) => {
      let details = {
        from: process.env.TrustVaultUsername,
        to: element.email,
        subject: "Status Verification",
        html: newone,
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
          console.log("There is an error");
        } else {
          console.log("Email has been sent");
        }
      });
    });
  }
};

exports.sendMailToUserP2 = (emails) => {
  if (emails) {
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.TrustVaultUsername,
        pass: process.env.TrustVaultPassword,
      },
    });
    let newone = emailtemplate2.replace("{{url}}", `http://localhost:3000/`);
    emails.forEach((element) => {
      let details = {
        from: process.env.TrustVaultUsername,
        to: element.email,
        subject: "Status Verification",
        html: newone,
      };

      mailTransporter.sendMail(details, (err) => {
        if (err) {
          console.log(err);
          console.log("There is an error");
        } else {
          console.log("Email has been sent");
        }
      });
    });
  }
};

exports.sendMailToNominee = async (filterData) => {
  let mailTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TrustVaultUsername,
      pass: process.env.TrustVaultPassword,
    },
  });

  for await (const ele of filterData) {
    var n_email = ele.n_email;
    var v_id = ele.v_id;

    //Here emailtemplate3 html page is edited by replacing the variables dynamically

    let htmlcontent = emailtemplate3
      .replace("{{username}}", ele.username)
      .replace("{{url}}", `http://localhost:3000/nominee/otp?v_id=${v_id}`);

    let details = {
      from: process.env.TrustVaultUsername,
      to: n_email,
      subject: "You are a Nominee",
      html: htmlcontent,
    };

    mailTransporter.sendMail(details, (err) => {
      if (err) {
        console.log(err);
        console.log("There is an error");
      } else {
        console.log("Email has been sent");
      }
    });
  }
};
