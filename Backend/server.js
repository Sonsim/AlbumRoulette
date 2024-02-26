const express = require("express");
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const config = {
  user: "AlbumRoulette",
  password: "test123",
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

app.get("/api/get/username/:username", (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error("Error connectiong", err);
      return;
    }

    const request = new sql.Request();
    request.query(
      `SELECT Username FROM Users Where Username='${req.params.username}'`,
      (err, result) => {
        if (err) console.log(err);
        res.send(result);
      }
    );
  });
});

app.post("/api/post/register", (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      res.status(500).send("Error connecting to database");
      return;
    }

    const request = new sql.Request();
    const username = req.body.username;
    const password = req.body.password;
    const sqlinsert =
      "INSERT INTO Users (Username, PasswordHash) VALUES (@username, @password)";

    request.input("username", sql.NVarChar, username);
    request.input("password", sql.NVarChar, password);

    request.query(sqlinsert, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error inserting data");
        return;
      }
      console.log("Inserted data successfully:", result);
      res.send(result);
    });
  });
});

app.listen(5174, () => {
  console.log("listening");
});
