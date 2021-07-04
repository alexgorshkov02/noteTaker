const express = require("express");
const path = require("path");

const { notes } = require("./db/notes");
// const { renderNoteList } = require("./public/assets/js/index");

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

app.get('/api/notes', (req, res) => {
    res.json(notes);
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
  });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
