const routes = require('express').Router();
const mysqlConnection = require('../dependencies/external_connections/mysql');

routes.post("/newReferee", (req, res) => {
    console.log(req);
    const { usn, pwd, name } = req.body;
    let queryInput = " ('" + usn + "','" + pwd + "','" + name + "');";
    let query = "INSERT INTO referee(usn, pwd, name) VALUES" + queryInput;
    mysqlConnection.query(query, (err, result) => {
      if (err) {
          return res.status(500).send(err);
      }
      res.send(200, {"id": result.insertId})
    });
});

module.exports = routes;