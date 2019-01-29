const routes = require('express').Router();
const mysqlConnection = require('../dependencies/external_connections/mysql');

routes.get("/leaderboardInfo", (req, res) => {
    let query = fetchLeaderboardQuery("basic");
    mysqlConnection.query(query, function(err, rows){
      if (err) {
        return res.status(500).send(err);
      }
      res.send(rows);
    });
});

const fetchLeaderboardQuery = (leaderboardType) => {
  switch(leaderboardType) {
    case "basic":
      return `SELECT id, name, totalScore
      FROM mainboard
      ORDER BY totalScore DESC;`;
    case "full":
      return `SELECT id, name, contestsWon, totalScore, country
      FROM mainboard
      ORDER BY totalScore DESC;`;
  }
}

module.exports = routes;