const express = require('express');
const app = express()
const PORT = process.env.PORT || 3001;
const { notes } = require('./db/db.json');








app.get('/api/notes', (req, res) => {
  let results = notes;

  res.json(results);
});

app.listen(PORT, () => {
  console.log(`API server now on ${PORT}.`);
});