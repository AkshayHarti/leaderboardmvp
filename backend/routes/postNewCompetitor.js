const routes = require('express').Router();
const mysqlConnection = require('../dependencies/external_connections/mysql');

routes.post("/newCompetitor", (req, res) => {
    console.log(req);
    const { usn, pwd, name } = req.body;
    const country = "DEFAULT", score = 0;
    let queryInput = " ('" + usn + "','" + pwd + "','" + name + "','" + country + "'," + score  +");";
    let query = "INSERT INTO competitor(usn, pwd, name, country, score) VALUES" + queryInput;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.send(200, {"id": result.insertId})
    });
});

module.exports = routes;