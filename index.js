const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { client, client2 } = require("./configs/database");
const authRoutes = require("./routes/authRoutes");
const vaultRoutes = require("./routes/vaultRoutes");
const cronRoutes = require("./routes/cronRoutes");
const nomineeRoutes = require("./routes/nomineeRoutes");
const cronJob = require("./cronJobs/checkUser");

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [
      "https://trustvault.vercel.app",
      /^https:\/\/trustvault\.vercel\.app$/,
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);

const port = process.env.PORT || 4000;

client.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected To Database!");
});

client2.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected To Database2!!");
});

app.get("/", (req, res) => {
  res.status(200).send("Server is up and running!!");
});

app.use("/auth", authRoutes);
app.use("/vault", vaultRoutes);
app.use("/cron", cronRoutes); //completed
app.use("/nominee", nomineeRoutes); //completed

cronJob.checkUser();
cronJob.checkUserP2();
cronJob.checkUserNomineePhase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
