const path = require("path");
const express = require("express");
const app = express();
const cors = require('cors')
const pool = require('./databasepg.js');

app.use(cors());

app.use(express.json());

app.use(express.static(path.join(__dirname, "../client/dist")));


app.post('/leaderboard', async (req, res) => {
  try{
    const newStat = await pool.query('INSERT INTO leaderboard (username, score) VALUES ($1, $2)', [req.body.username, req.body.score]);
    res.json(newStat);
  } catch (err) {
    console.error(err.message);
  }
})


app.get('/leaderboard', async (req, res) => {
  try {
    const allStats = await pool.query('SELECT username, score FROM leaderboard ORDER BY score DESC LIMIT ($1)', [20]);
    res.json(allStats.rows);
  } catch (err) {
    console.error(err.message);
  }
})


app.listen(3000, () => {
  console.log('Connected');
});