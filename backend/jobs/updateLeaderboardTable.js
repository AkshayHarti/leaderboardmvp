const mysqlConnection = require('../dependencies/external_connections/mysql');

const query_competitorDetails = `SELECT id, GROUP_CONCAT(contest SEPARATOR '|') AS contests, resultTable.name, resultTable.score, resultTable.country
FROM (SELECT person.id, contest.id AS contest, person.name, person.score, person.country FROM h2h contest, competitor person WHERE (contest.competitor1=person.id AND result=1) OR (contest.competitor2=person.id AND result=2)) resultTable
GROUP BY id ORDER BY resultTable.score DESC;`
const query_leaderboard = "SELECT id FROM mainboard WHERE id=";
const feedInMysql = () => {

  mysqlConnection.query(query_competitorDetails, (err, result) => {
    if (err) {
        return new Error("query_competitorDetails failed");
    }
    
    let query_iuCompetitor;
    for(let data of result) {
      
      
      let queryInsert = "(" + data.id + ",'" + data.name + "','" + data.contests + "'," + data.score + ",'" + data.country + "')";
      let queryUpdate = "name='" + data.name + "', contestsWon='" + data.contests + "', totalScore=" + data.score + ", country='" + data.country + "';";
      query_iuCompetitor = "INSERT INTO mainboard VALUES " + queryInsert + " ON DUPLICATE KEY UPDATE " + queryUpdate;
      //console.log("going = ",typeof data.contests,query_iuCompetitor);
      mysqlConnection.query(query_iuCompetitor, (err, result) => {
        if (err) {
          return new Error("query_iuCompetitor failed");
        }
        //console.log("res = ", result);
      });
    }
  });
}

module.exports = feedInMysql;