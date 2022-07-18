const express = require('express');
const app = express()
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db.json');





function createNewNote(body, notesArray){
  console.log(body);
  // function code to go here

  //return finished code to post to route for response
  return body;
}

// GET request api call
app.get('/api/notes', (req, res) => {
  res.json(notes);
});
// POST request api call
app.post('/api/notes', (req, res) => {
  // setting an auto-generated ID based on the length property so that notes can be 
  // distinguised on the server (change later when dealing with DELETE requests)
  req.body.id = notes.length.toString();

  res.json(req.body);
});
// LISTEN request for the server 
app.listen(PORT, () => {
  console.log(`API server now on ${PORT}.`);
});