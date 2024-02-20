const express = require("express");
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const app = express();

app.use(cors());
const config = {
  user: "AlbumRoulette",
  password: "test123",
  host: "localhost",
  server: "(localdb)\\local",
  driver: "msnodesqlv8",
  database: "Albums",
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
  },
};

app.get("/api/get/albums", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();
    request.query("SELECT * FROM AlbumTable", (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  });
});

app.get("/api/get/users", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();
    request.query("SELECT * FROM Users", (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  });
});

app.listen(5174, () => {
  console.log("listening");
});
