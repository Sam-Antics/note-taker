const express = require('express');
const app = express()
const { notes } = require('./db/db.json');








app.get('/api/notes', (req, res) => {
  let results = notes;
  
  res.json(results);
});

app.listen(3001, () => {
  console.log(`API server now on port 3001`);
})