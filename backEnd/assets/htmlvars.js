const emailtemplate = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      .page {
        background: white;
        height: 32rem;
        width: 22rem;
        margin: auto;
        border: 2px solid black;
      }
      .heading {
        background: linear-gradient(269.82deg, #09c6f9 -14.77%, #045de9 69.37%);
        height: 10%;
        color: white;
        font-weight: bolder;
        font-size: large;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .a {
        margin-left: 0.75rem;
        margin-top: 0.7rem;
      }
      .logo {
        margin-left: 0.8rem;
        margin-top: 0.5rem;
      }
      .content {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        padding-left: 1rem;
        padding-top: 2rem;
        font-weight: bolder;
      }
      .logo2 {
        margin-left: 1.8rem;
      }
      .loginbutton {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: larger;
        font-weight: bolder;
        color: white;
        background: #045de9;
        width: 25%;
        height: 8%;
        border-radius: 10px;
        text-align: center;
        padding-top: 0.75rem;
        margin: auto;
      }
      .loginbutton:hover {
        cursor: pointer;
      }
    </style>
  </head>
  <body style="background: whitesmoke; min-height: 35rem;padding: 2rem">
    <div class="page">
      <div class="heading">
        <div class="logo">
          <img
            src="http://drive.google.com/uc?export=view&id=1Yi02wWxCu7e5i8L5LCtCI68jVuegDBcB"
            height="32px"
            width="32px"
            alt=""
          />
        </div>
        <div class="a">TrustVault</div>
      </div>
      <div class="content">
        Hey User Please Once Login to your TrustVault account.<br /><br />
        It is just for the status verification
      </div>
      <div class="logo2">
        <img
          src="http://drive.google.com/uc?export=view&id=1JfcJDk0GxJ_5XX984OWq_hnnkBypHQhP"
          height="250"
          width="300"
          alt=""
        />
      </div>
      <div class="loginbutton">
        <a
          href="{{url}}"
          style="text-decoration: none; color: white"
          >LOGIN</a
        >
      </div>
    </div>
  </body>
</html>
`;

const emailtemplate2 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        /* background: linear-gradient(269.82deg, #09c6f9 -14.77%, #045de9 69.37%); */
        background: lightgrey;
        padding: 32px;
      }
      .page {
        background: white;
        height: 32rem;
        width: 22rem;
        margin: auto;
        border: 2px solid black;
      }
      .heading {
        background: linear-gradient(269.82deg, #09c6f9 -14.77%, #045de9 69.37%);
        height: 10%;
        color: white;
        font-weight: bolder;
        font-size: large;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .a {
        margin-left: 0.75rem;
        margin-top: 0.7rem;
      }
      .logo {
        margin-left: 0.8rem;
        margin-top: 0.5rem;
      }
      .content {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        padding-left: 1rem;
        padding-top: 2rem;
        font-weight: bolder;
      }
      .logo2 {
        margin-left: 1.8rem;
      }
      .loginbutton {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: larger;
        font-weight: bolder;
        color: white;
        background: #045de9;
        width: 25%;
        height: 8%;
        border-radius: 10px;
        text-align: center;
        padding-top: 0.75rem;
        margin: auto;
      }
      .loginbutton:hover {
        cursor: pointer;
      }
    </style>
  </head>
  <body style="background: lightgrey">
    <div class="page">
      <div class="heading">
        <div class="logo">
          <img
            src="http://drive.google.com/uc?export=view&id=1Yi02wWxCu7e5i8L5LCtCI68jVuegDBcB"
            height="32px"
            width="32px"
            alt=""
          />
        </div>
        <div class="a">TrustVault</div>
      </div>
      <div class="content">
        <b style="color: red">Alert!!</b> Please Once Login to your TrustVault
        account.<br /><br />
        <b style="color: red; font-weight: bolder"
          >Else your TrustVault data will be sent to nominees</b
        ><br /><br />
        It is just for the status verification
      </div>
      <div class="logo2">
        <img
          src="http://drive.google.com/uc?export=view&id=1JfcJDk0GxJ_5XX984OWq_hnnkBypHQhP"
          height="220"
          width="280"
          alt=""
        />
      </div>
      <div class="loginbutton">
        <a
          href="{{url}}"
          style="text-decoration: none; color: white"
          >LOGIN</a
        >
      </div>
    </div>
  </body>
</html>
`;

const emailtemplate3 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        /* background: linear-gradient(269.82deg, #09c6f9 -14.77%, #045de9 69.37%); */
        background: lightgrey;
        padding: 32px;
      }
      .page {
        background: white;
        height: 32rem;
        width: 22rem;
        margin: auto;
        border: 2px solid black;
      }
      .heading {
        background: linear-gradient(269.82deg, #09c6f9 -14.77%, #045de9 69.37%);
        height: 10%;
        color: white;
        font-weight: bolder;
        font-size: large;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .a {
        margin-left: 0.75rem;
        margin-top: 0.7rem;
      }
      .logo {
        margin-left: 0.8rem;
        margin-top: 0.5rem;
      }
      .content {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        padding-left: 1rem;
        padding-top: 2rem;
        font-weight: bolder;
      }
      .logo2 {
        margin-left: 1.8rem;
      }
      .loginbutton {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: larger;
        font-weight: bolder;
        color: white;
        background: #045de9;
        width: 25%;
        height: 8%;
        border-radius: 10px;
        text-align: center;
        padding-top: 0.75rem;
        margin: auto;
      }
      .loginbutton:hover {
        cursor: pointer;
      }
    </style>
  </head>
  <body style="background: lightgrey">
    <div class="page">
      <div class="heading">
        <div class="logo">
          <img
            src="http://drive.google.com/uc?export=view&id=1Yi02wWxCu7e5i8L5LCtCI68jVuegDBcB"
            height="32px"
            width="32px"
            alt=""
          />
        </div>
        <div class="a">TrustVault</div>
      </div>
      <div class="content">
        Hey!! {{username}} kept you as a nominee for his vault in our website<br /><br />
        <b style="color: red; font-weight: bolder"
          >Click on the below open button to see the data</b
        ><br /><br />
        And verify yourself to see the data
      </div>
      <div class="logo2">
        <img
          src="http://drive.google.com/uc?export=view&id=1JfcJDk0GxJ_5XX984OWq_hnnkBypHQhP"
          height="220"
          width="280"
          alt=""
        />
      </div>
      <div class="loginbutton">
        <a
          href="{{url}}"
          style="text-decoration: none; color: white"
          >OPEN</a
        >
      </div>
    </div>
  </body>
</html>
`;

const emailtemplate4 = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <style>
      body {
        /* background: linear-gradient(269.82deg, #09c6f9 -14.77%, #045de9 69.37%); */
        background: lightgrey;
        padding: 32px;
      }
      .page {
        background: white;
        height: 32rem;
        width: 22rem;
        margin: auto;
        border: 2px solid black;
      }
      .heading {
        background: linear-gradient(269.82deg, #09c6f9 -14.77%, #045de9 69.37%);
        height: 10%;
        color: white;
        font-weight: bolder;
        font-size: large;
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        display: flex;
        justify-content: flex-start;
        align-items: center;
      }
      .a {
        margin-left: 0.75rem;
        margin-top: 0.7rem;
      }
      .logo {
        margin-left: 0.8rem;
        margin-top: 0.5rem;
      }
      .content {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        padding-left: 1rem;
        padding-top: 2rem;
        font-weight: bolder;
      }
      .logo2 {
        margin-left: 1.8rem;
      }
      .loginbutton {
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        font-size: larger;
        font-weight: bolder;
        color: white;
        background: #045de9;
        width: 30%;
        height: 8%;
        border-radius: 10px;
        text-align: center;
        padding-top: 0.75rem;
        margin: auto;
      }
      .loginbutton:hover {
        cursor: pointer;
      }
    </style>
  </head>
  <body style="background: lightgrey">
    <div class="page">
      <div class="heading">
        <div class="logo">
          <img
            src="http://drive.google.com/uc?export=view&id=1Yi02wWxCu7e5i8L5LCtCI68jVuegDBcB"
            height="32px"
            width="32px"
            alt=""
          />
        </div>
        <div class="a">TrustVault</div>
      </div>
      <div class="content">
        Hey!! Below is the otp requested by you<br /><br />
        <b style="color: red; font-weight: bolder">Don't Share with anyone</b
        ><br /><br />
        If not you requested otp let us know
      </div>
      <div class="logo2">
        <img
          src="http://drive.google.com/uc?export=view&id=1JfcJDk0GxJ_5XX984OWq_hnnkBypHQhP"
          height="220"
          width="280"
          alt=""
        />
      </div>
      <div class="loginbutton">
        <b style="text-decoration: none; color: white">{{otp}}</b>
      </div>
    </div>
  </body>
</html>
`;
module.exports = {
  emailtemplate,
  emailtemplate2,
  emailtemplate3,
  emailtemplate4,
};
