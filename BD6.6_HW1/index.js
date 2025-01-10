const express = require('express');
const cors = requires('cors');
const app = express();
const { getAllMovies, getMoviesById } = require('./controllers');
app.use(express.json());
app.use(cors());

//  Retrieve All Movies
app.get('/movies', async (req, res) => {
  let result = await getAllMovies();
  res.json({ result });
});

// Retrieve Movie by ID

app.get('/movies/details/1', async (req, res) => {
  let result = await getMoviesById(req.params.id);
  res.json({ result });
});

module.exports = { app };
