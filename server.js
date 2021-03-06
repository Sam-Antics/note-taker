const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
// get all the assets for the HTML to load properly
app.use(express.static('public'));
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

// adding a note to test that I changed the heroku URL correctly


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
// GET route for index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});
// Wildcard route (if anything other than the above is entered as a route, it will go to index.html)
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});
// LISTEN request for the server 
app.listen(PORT, () => {
  console.log(`API server now on ${PORT}.`);
});