const express = require("express");
const sql = require("mssql/msnodesqlv8");
const cors = require("cors");
const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwtKey = process.env.VITE_JWT_SECRET;
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

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
app.get("/api/get/jwt", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();
    const username = req.body.username;
    request.query(
      `SELECT Username FROM Users Where Username='${username}'`,
      (err, result) => {
        if (err) console.log(err);
        else if (result.recordset != undefined) {
          const jwtToken = jwt.sign(result, jwtKey);
          let userData = {
            user: {
              userName: result.recordset.Username,
              jsonWebToken: jwtToken,
            },
          };
          res.send(userData);
        } else {
          res.send(result);
        }
      }
    );
  });
});
app.get("/api/get/albums/:tablename", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);

    const request = new sql.Request();
    request.query(`SELECT * FROM ${req.params.tablename}`, (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  });
});

app.get("/api/get/globalalbums", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    request.query("Select * from GlobalAlbum", (err, result) => {
      if (err) console.log(err);
      res.send(result);
    });
  });
});
app.post("/api/post/globalheard", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    const album = req.body.album;
    const value = req.body.value;
    request.query(
      `update GlobalAlbum Set Is_Heard=Is_Heard + '${value}' where Title='${album}'`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      }
    );
  });
});

app.post("/api/post/globalscore", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    const album = req.body.album;
    const score = req.body.score;
    request.query(
      `Update GlobalAlbum SET Score=Score + '${score}' WHERE Title='${album}'`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      }
    );
  });
});

app.post("/api/post/album_heard", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    const album = req.body.album;
    const table = req.body.table;

    request.query(
      `UPDATE ${table} SET Is_Heard=1 WHERE Title='${album}'`,
      (err, result) => {
        if (err) {
          console.log(err);
        }
        res.send(result);
      }
    );
  });
});
app.post("/api/post/setscore", (req, res) => {
  sql.connect(config, (err) => {
    if (err) console.log(err);
    const request = new sql.Request();
    const score = req.body.score;
    const album = req.body.album;
    const table = req.body.table;
    request.query(`Update ${table} Set Score=${score} WHERE tITLE='${album}'`);
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
        } else if (result.recordset[0]) {
          let data = {
            user: {
              result,
            },
          };
          const jwtToken = jwt.sign(result, jwtKey);
          let userData = {
            user: {
              userID: result.recordset[0].UserId,
              userName: result.recordset[0].Username,
              jsonWebToken: jwtToken,
            },
          };
          res.send(userData);
        } else {
          res.send(result);
        }
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
        res.status(500).send("Error inserting data");
        return;
      }
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
      Score Decimal,
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
