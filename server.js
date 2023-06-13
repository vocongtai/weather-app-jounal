// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

//post: add method
app.post("/add", addMethod);

function addMethod(req, res) {
  projectData["temp"] = req.body.temp;
  projectData["date"] = req.body.date;
  projectData["content"] = req.body.content;
  res.send(projectData);
}
//get method:
const getMethod = (req, res) => {
  res.send(projectData);
};

app.get("/all", getMethod);

// Setup Server

const port = 8081;
const server = app.listen(port, () => {
  console.log(`server listen on port : ${port}`);
});
