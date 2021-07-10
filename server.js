const express = require("express");
const path = require("path");
const fs = require("fs");

const { notes } = require("./db/notes");
// const { saveNote } = require("./public/assets/js/index");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  // res.send(notes);
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  const notesJSON = fs.readFileSync("./db/notes.json", "utf8");
  console.log(notesJSON);
  const {notes} = JSON.parse(notesJSON);
  res.json(notes);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", (req, res) => {
  const note = req.body;
  note.id = Math.random().toString(36).slice(2);
  const notesJSON = fs.readFileSync("./db/notes.json", "utf8");
  console.log(notesJSON);
  const {notes} = JSON.parse(notesJSON);

  console.log("Notes: ", notes);
  console.log("Note: ", note);
  notes.push(note);
  fs.writeFileSync("./db/notes.json", JSON.stringify({notes}));
  res.json(note);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
