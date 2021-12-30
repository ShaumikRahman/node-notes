const uuid = require("uuid");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express/lib/response");
const app = express();
const PORT = 3000 || process.env.PORT;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.post("/", async (req, res) => {
  res.setHeader("Content-type", "application/json");

  console.log(typeof new Date().toString());

  fs.readFile(
    path.join(__dirname, "notes", "notes.json"),
    "utf-8",
    (err, data) => {

      if (err) {
        console.log(err);
        res.end({
          result: "fail",
        });
      } else {
        res.send(data);
      }
    }
  );
});

app.post("/add", async (req, res) => {
  res.setHeader("Content-type", "application/json");

  console.log(req.body.note);

  fs.readFile(
    path.join(__dirname, "notes", "notes.json"),
    "utf-8",
    (err, data) => {
      if (err) {
        console.log(err);
        res.end({
          result: "fail",
        });
      } else {
        const notes = [
          ...JSON.parse(data),
          {
            id: uuid.v4(),
            title: req.body.title,
            created: new Date().getTime(),
            modified: "",
            body: req.body.note,
          },
        ];

        fs.writeFile(path.join(__dirname, 'notes', 'notes.json'), JSON.stringify(notes), err => {
          if (err) {
            res.end({
              result: 'fail'
            });
          }
        });

        // write WIP

        res.send({
          result: notes
        });
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
