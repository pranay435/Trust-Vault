const cron = require("node-cron");
const { client } = require("../configs/database");
const mail = require("./mailSender");

exports.checkUser = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const result = await client.query(
        `SELECT email FROM users WHERE last_login_time <= CURRENT_TIMESTAMP - INTERVAL '7 days' AND last_login_time > CURRENT_TIMESTAMP - INTERVAL '14 days';`
      );
      const emails = result.rows;
      // console.log(emails);
      mail.sendMailToUser(emails);
    } catch (err) {
      console.log(err);
    }
  });
};

exports.checkUserP2 = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const result = await client.query(
        `SELECT email FROM users WHERE last_login_time <= CURRENT_TIMESTAMP - INTERVAL '14 days' AND last_login_time > CURRENT_TIMESTAMP - INTERVAL '19 DAYS';`
      );
      const emails = result.rows;
      mail.sendMailToUserP2(emails);
    } catch (err) {
      console.log(err);
    }
  });
};

exports.checkUserNomineePhase = () => {
  cron.schedule("0 0 * * *", async () => {
    try {
      const result = await client.query(
        `SELECT email FROM users WHERE last_login_time <= CURRENT_TIMESTAMP - INTERVAL '19 days';`
      );
      const emails = result.rows;
      // console.log(emails);
      if (emails) {
        for await (const element of emails) {
          const data = await client.query(
            `SELECT v_id,username,n_email FROM users NATURAL JOIN vaults NATURAL JOIN vault_nom WHERE email = '${element.email}';`
          );
          const filterData = data.rows;
          // console.log(filterData);
          mail.sendMailToNominee(filterData);
          await client.query(
            `UPDATE users SET last_login_time = NULL WHERE email = '${element.email}';`
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
};
