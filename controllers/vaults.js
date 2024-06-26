const { client, client2 } = require("../configs/database");
const cryptoJs = require("crypto-js");
const bcrypt = require("bcrypt");

exports.getAllVaults = async (req, res) => {
  try {
    const data = await client.query(
      `SELECT * FROM vaults natural join users WHERE email = '${req.email}' ORDER BY v_id;`
    );
    const vaultdata = data.rows;
    const filterData = await Promise.all(
      vaultdata.map(async (note) => {
        const data2 = await client.query(
          `SELECT n_name FROM vault_nom WHERE v_id = ${note.v_id};`
        );
        n_name = data2.rows;
        return {
          v_id: note.v_id,
          v_name: note.v_name,
          n_name: n_name,
        };
      })
    );
    res.status(200).json({
      message: "Success",
      filterData: filterData,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database Error Occurred",
    });
  }
};

exports.addVault = async (req, res) => {
  try {
    const { v_name, data, nomineeDetails, vaultSecretKey, description } =
      req.body;
    const u_id = req.uid;
    const key_data = await client2.query(
      `SELECT * FROM server_keys WHERE s_id = 1;`
    );
    const Final_Key =
      key_data.rows[0].key + vaultSecretKey + process.env.PEPPER;
    const hash = cryptoJs.SHA3(Final_Key);
    const hash_final_key = hash.toString(cryptoJs.enc.Hex);
    // Encrypt the vault data with the hash_final_key
    const encrypted_data = cryptoJs.AES.encrypt(data, hash_final_key);
    await client.query(
      `INSERT INTO vaults(v_name,data,description,u_id) VALUES ('${v_name}','${encrypted_data}','${description}',${u_id});`
    );
    let v_id = await client.query(
      `SELECT MAX(v_id) FROM vaults WHERE u_id = ${u_id};`
    );
    v_id = v_id.rows[0].max;
    for (const nominee of nomineeDetails) {
      await client.query(
        `INSERT INTO vault_nom (v_id,n_email,n_name,n_ph_no) VALUES (${v_id},'${nominee.n_email}','${nominee.n_name}','${nominee.n_ph_no}');`
      );
    }
    res.status(200).json({
      message:
        "Successfully Vault details and Nominee Details Are Added To The Database",
    });
  } catch (error) {
    res.status(500).json({
      error: "Database Error Occurred",
    });
  }
};

exports.displayVault = async (req, res) => {
  try {
    const { vaultSecretKey, vId } = req.body;
    const key_data = await client2.query(
      `SELECT * FROM server_keys WHERE s_id = 1;`
    );
    const Final_key =
      key_data.rows[0].key + vaultSecretKey + process.env.PEPPER;
    const hash = cryptoJs.SHA3(Final_key);
    const hash_final_key = hash.toString(cryptoJs.enc.Hex);
    const abcData = await client.query(
      `SELECT * FROM vaults WHERE v_id = ${vId};`
    );
    const filterData = abcData.rows[0];
    const vaultData = filterData.data;
    const abcData2 = await client.query(
      `SELECT * FROM vault_nom WHERE v_id = ${vId};`
    );
    const nomData = abcData2.rows;
    try {
      const vault_data = cryptoJs.AES.decrypt(vaultData, hash_final_key);
      const vault_data2 = vault_data.toString(cryptoJs.enc.Utf8);
      if (vault_data2 === "") {
        res.status(401).json({
          error: "Wrong Secret Key",
        });
      } else {
        res.status(200).json({
          v_id: vId,
          v_name: filterData.v_name,
          data: vault_data2,
          description: filterData.description,
          nominee: nomData,
        });
      }
    } catch (internalError) {
      res.status(401).json({
        error: "Wrong Secret Key",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Database Error Occurred",
    });
  }
};

exports.updateVault = async (req, res) => {
  //updateVault is also same as addVault but it will update the vault details in the
  //database with the updated values in that palce
  //Here firstly on frontend when he clicks on edit button it should
  //once fetch details from dislay vault and put those details on place holder of that value
  //so without changing details then placeholder values will be the body request
  //if they cancel the editing then no request will be send to updateVault
  //here vault secret key is again asked while accessing the route
  const { v_name, data, nominee, vaultSecretKey, description } = req.body;
  const vId = req.params.vId;
  const u_id = req.uid;

  try {
    const skey = await client2.query(
      `SELECT * FROM server_keys WHERE s_id = 1;`
    );
    const server_key = skey.rows[0].key;
    const Final_key2 = server_key + vaultSecretKey + process.env.PEPPER;
    const hash = cryptoJs.SHA3(Final_key2);
    const hash_final_key = hash.toString(cryptoJs.enc.Hex);
    const encrypted_data = cryptoJs.AES.encrypt(data, hash_final_key);

    await client.query(
      `UPDATE vaults SET v_name = '${v_name}',data = '${encrypted_data}',description = '${description}' WHERE u_id = ${u_id} AND v_id = ${vId};`
    );

    await client.query(`DELETE FROM vault_nom WHERE v_id = ${vId};`);

    for (const nom of nominee) {
      await client.query(
        `INSERT INTO vault_nom (v_id,n_email,n_name,n_ph_no) VALUES (${vId},'${nom.n_email}','${nom.n_name}','${nom.n_ph_no}');`
      );
    }

    res.status(200).json({
      message: "Updated Successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database Error Occurred",
    });
  }
};

exports.deleteVault = async (req, res) => {
  //He should enter his login password to delete the vault
  const { password } = req.body;
  const u_id = req.uid;
  const vId = req.params.vId;
  // console.log(password);
  // console.log(u_id);
  try {
    const data = await client.query(
      `SELECT * FROM users WHERE u_id = ${u_id};`
    );
    const hashPass = data.rows[0].password;

    result = await bcrypt.compare(password, hashPass);
    if (result === true) {
      await client.query(`DELETE FROM vault_nom WHERE v_id = ${vId};`);
      await client.query(
        `DELETE FROM vaults WHERE u_id = ${u_id} AND v_id = ${vId};`
      );
      res.status(200).json({
        message: "Succefully Vault Is Deleted",
      });
    } else {
      res.status(401).json({
        error: "Enter the correct password!!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Database Error Occurred",
    });
  }
};
