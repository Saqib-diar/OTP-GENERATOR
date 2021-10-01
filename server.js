const express = require("express");
const bodyParser = require('body-parser')
const ErrorController = require('./app/controllers/error')

const app = express();

// app.use(cors(corsOptions));
app.set('view engine', 'ejs');

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
const db = require("./app/models");


db.sequelize.sync();


// simple route
app.get("/", (req, res) => {
  res.json({ message: "OTP GENERATOR." });
});

require("./app/routes/user.routes")(app);


app.use(ErrorController.error404)

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});