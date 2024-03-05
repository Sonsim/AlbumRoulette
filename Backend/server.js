const express = require("express");
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const app = express();
require("dotenv").config();
const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
app.use(express.json());
app.use(cors());
console.log(client_id);
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
    const tableName = req.body.tableName;
    request.query("SELECT * FROM AlbumTable", (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  });
});

app.get("/api/get/username/:username", (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error("Error connecting", err);
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
app.get("/api/get/userid/:username", (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error("Error connecting", err);
      return;
    }
    const request = new sql.Request();
    request.query(
      `SELECT UserID FROM Users Where Username='${req.params.username}'`,
      (err, result) => {
        if (err) console.log(err);
        res.send(result);
      }
    );
  });
});
app.post("/api/get/user-login", (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error("Error connecting", err);
      return;
    }
    const request = new sql.Request();
    const username = req.body.user;
    const password = req.body.pass;
    request.query(
      `SELECT * FROM Users Where Username='${username}' AND PasswordHash='${password}'`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
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

app.post("/api/post/createtable", (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      res.status(500).send("Error connecting to database");
      return;
    }
    const request = new sql.Request();
    const foreignKey = req.body.foreignKey;
    const tableName = req.body.tableName;
    const sqlQuery = `CREATE TABLE [${tableName}] (
      Id INT NOT NULL IDENTITY PRIMARY KEY,
      Title VARCHAR(200),
      Artist VARCHAR(200),
      Genre VARCHAR(200),
      Release_Year INT,
      Number_of_Songs INT,
      Is_Heard BIT,
    )`;
    console.log(tableName);
    console.log(foreignKey);
    request.query(sqlQuery, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error creating table");
        return;
      }
      console.log("Table created successfully", result);
      res.send(result);
    });
  });
});
app.post("/api/post/fill", (req, res) => {
  sql.connect(config, (err) => {
    if (err) {
      console.error("Error connecting to database:", err);
      res.status(500).send("Error connecting to database");
      return;
    }

    const request = new sql.Request();
    const tableName = req.body.tableName;
    const sqlQuery = `INSERT INTO [${tableName}] (Title, Artist, Genre, Release_Year, Number_of_Songs, Is_Heard) SELECT Title, Artist, Genre, Release_Year, Number_of_Songs, Is_Heard FROM AlbumTable`;

    request.query(sqlQuery, (err, result) => {
      if (err) {
        console.error("Error executing query:", err);
        res.status(500).send("Error creating table");
        return;
      }
      console.log("Data insereted successfully", result);
      res.send(result);
    });
  });
});
app.listen(5174, () => {
  console.log("listening");
});
