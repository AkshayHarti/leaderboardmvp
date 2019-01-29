const routes = require('express').Router();
const mysqlConnection = require('../dependencies/external_connections/mysql');

routes.post("/score", (req, res) => {
    const { competitor1, competitor2, result } = req.body;
    let queryInput = " (" + competitor1 + "," + competitor2 + "," + result + ");";
    let query = "INSERT INTO h2h(competitor1, competitor2, result) VALUES" + queryInput;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      console.log(result);
    });
  
    if(result === "0") {
      queryInput = "(" + competitor1 + "," + competitor2 + ");";
      query = "UPDATE competitor SET score = score + 1 WHERE id IN " + queryInput;
    } else {
      queryInput = (result === "1") ? competitor1 : competitor2 + ";";
      query = "UPDATE competitor SET score = score + 2 WHERE id=" + queryInput;
    }
  
    mysqlConnection.query(query, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.sendStatus(200);
    });
});

module.exports = routes;