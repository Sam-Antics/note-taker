const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db.json');





function createNewNote(body, notesArray){
  const note = body;
  // this will push the new data to the end of the array...
  notesArray.push(note);
  // ... and write the file synchronously to the db.json file
  fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );

  //return finished code to post to route for response
  return note;
}

// validate the data coming in
function validateNote(note) {
  if (!note.title || typeof note.title !== 'string') {
    return false;
  }
  if (!note.text || typeof note.text !== 'string') {
    return false;
  } 
  return true;
}




/**API ROUTES **/
// GET request api route
app.get('/api/notes', (req, res) => {
  res.json(notes);
});
// POST request api route
app.post('/api/notes', (req, res) => {
  // setting an auto-generated ID based on the length property so that notes can be 
  // distinguised on the server (change later when dealing with DELETE requests)
  req.body.id = notes.length.toString();

  // if any data is incorrect, send 400 error back
  if (!validateNote(req.body)) {
    res.status(400).send('The note is not properly formatted.');
  } else {
  // add note to the json file and notes array
  const note = createNewNote(req.body, notes);
  res.json(note);
  }
});
// LISTEN request for the server 
app.listen(PORT, () => {
  console.log(`API server now on ${PORT}.`);
});