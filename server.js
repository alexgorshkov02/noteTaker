const express = require("express");
const path = require("path");
const fs = require("fs");

const { notes } = require("./db/notes");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", (req, res) => {
  const notesJSON = fs.readFileSync("./db/notes.json", "utf8");
  const { notes } = JSON.parse(notesJSON);
  res.json(notes);
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", (req, res) => {
  const note = req.body;

  // Generate an unique id
  note.id = Math.random().toString(36).slice(2);

  // Get all existing notes
  const notesJSON = fs.readFileSync("./db/notes.json", "utf8");
  const { notes } = JSON.parse(notesJSON);

  // Add a new note to existing
  notes.push(note);

  // Write all notes
  fs.writeFileSync("./db/notes.json", JSON.stringify({ notes }));

  res.json(note);
});

app.delete("/api/notes/:id", (req, res) => {
  // Get a note's id
  const noteID = req.params.id;

  // Get all existing notes
  const notesJSON = fs.readFileSync("./db/notes.json", "utf8");

  // Get an array of all notes
  const { notes } = JSON.parse(notesJSON);

  // Identify an element in the array to remove it
  const removeIndex = notes.findIndex((note) => note.id === noteID);

  // Remove the selected note
  notes.splice(removeIndex, 1);

  // Write all notes without removed
  fs.writeFileSync("./db/notes.json", JSON.stringify({ notes }));

  res.json(noteID);
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
