const express = require("express");
const mysql = require("mysql8");
const cors = require("cors");
const PORT = process.env.PORT || 5050;
const app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Model Uganda Website Will be uploaded here soon");
});

//db
const MYSQL_CONFIG = {
  host: "104.198.133.80",
  user: "muucoop",
  password: "user",
  database: "testing_db",
};

const conn = mysql.createConnection(MYSQL_CONFIG);
conn.connect((err) => {
  if (err) throw err;
  console.log("Database connected....");
});

//db routes
app.post("/app/new_member", (req, res) => {
  console.log(req.body);
  conn.query(
    "SELECT member_number FROM member_tbl",
    (mbr_number_err, mbr_number_result) => {
      if (mbr_number_err) {
        res.send({ data: "Error" });
        throw err;
      } else {
        let member_number =
          mbr_number_result.length > 0
            ? parseInt(
                mbr_number_result[mbr_number_result.length - 1].member_number
              ) + 1
            : 1;
        conn.query(
          "INSERT INTO member_tbl SET ?",
          {
            member_number,
            member_first_name: req.body.member_first_name,
            member_surname: req.body.member_surname,
            member_nin: req.body.member_nin,
            member_email: req.body.member_email,
            member_phone: req.body.member_phone,
            member_password: req.body.member_password,
            member_next_of_kin: req.body.member_next_of_kin,
            member_next_of_kin_phone: req.body.member_next_of_kin_phone,
            member_location: req.body.member_location,
          },
          (err, result) => {
            if (err) {
              res.send({ data: "Error" });
              throw err;
            } else {
              res.send({ registered: true, data: req.body });
            }
          }
        );
      }
    }
  );
});

app.post("/app/login", (req, res) => {
  let { number, password } = req.body;
  conn.query(
    "SELECT * FROM member_tbl WHERE member_number = ? AND member_password = ?",
    [number, password],
    (err, result) => {
      if (err) {
        res.send({ data: "Error" });
        throw err;
      } else {
        if (result.length > 0) {
          res.send({ data: result[0] });
        } else {
          res.send({ data: "Wrong_details" });
        }
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}....`);
});
