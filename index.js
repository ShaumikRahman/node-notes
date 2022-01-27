const uuid = require("uuid");
const express = require("express");
const path = require("path");
const fs = require("fs");
const { json } = require("express/lib/response");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

app.get("/about", (req,res) => {
  res.setHeader("Content-type", "text/html");

  fs.readFile(path.join(__dirname, 'public', 'about.html'), {encoding: 'utf-8'}, (err,data) => {
    if (err) {
      throw err;
    } else {
      res.send(data);
    }
  });
});

app.post("/", async (req, res) => {
  res.setHeader("Content-type", "application/json");

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

        fs.writeFile(
          path.join(__dirname, "notes", "notes.json"),
          JSON.stringify(notes),
          (err) => {
            if (err) {
              res.end({
                result: "fail",
              });
            }
          }
        );

        res.send({
          result: notes,
        });
      }
    }
  );
});

app.post("/delete", (req, res) => {
  res.setHeader("Content-type", "application/json");

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
        console.log(JSON.parse(data));

        const newNotes = JSON.parse(data).filter(
          (note) => note.id !== req.body.id
        );

        console.log(newNotes);

        fs.writeFile(
          path.join(__dirname, "notes", "notes.json"),
          JSON.stringify(newNotes),
          (err) => {
            if (err) {
              console.log(err);
              res.end({ result: "fail to write" });
            }
          }
        );

        res.send({
          newNotes,
        });
      }
    }
  );
});

app.post("/edit", (req, res) => {
  res.setHeader("Content-type", "application/json");

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
        const newNotes = JSON.parse(data).map((note) => {
          if (note.id === req.body.id) {
            return {
              id: note.id,
              title: req.body.title,
              created: note.created,
              modified: req.body.modified,
              body: req.body.note,
            };
          } else {
            return note;
          }
        });

        fs.writeFile(
          path.join(__dirname, "notes", "notes.json"),
          JSON.stringify(newNotes),
          {},
          (err) => {
            if (err) {
              res.end({
                result: "fail",
              });
            } else {
              res.send({
                newNotes
              });
            }
          }
        );
      }
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
