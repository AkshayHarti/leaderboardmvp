const express = require("express");
const mysqlConnection = require('./dependencies/external_connections/mysql');
const bodyParser = require("body-parser");
const logger = require("morgan");
const constants = require("./dependencies/constants");
const updateJob = require("./jobs/updateLeaderboardTable");
const postScore = require("./routes/postScore");
const getLeaderboardInfo = require("./routes/getLeaderboardInfo");
const postNewReferee = require("./routes/postNewReferee");
const postNewCompetitor = require("./routes/postNewCompetitor");

const app = express();
const router = express.Router();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// This part updates the leaderboard db after every 15 seconds
const mysqlFeeder = setInterval(updateJob, constants.MYSQL_FEED_INTERVAL);

// append /api for our http requests
app.use("/api", router);
app.use("/api", postScore);
app.use("/api", getLeaderboardInfo);
app.use("/api", postNewReferee);
app.use("/api", postNewCompetitor);

// launch our backend into a port
app.listen(constants.API_PORT, () => console.log(`LISTENING ON PORT ${constants.API_PORT}`));