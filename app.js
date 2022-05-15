require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");

/************************** Paths for routes defined below *******************************/
const indexPath = require("./routes/index");
const deletePath = require("./routes/delete");
const customListPath = require("./routes/customlist");



app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static("public"));

mongoose.connect(process.env.MY_DB_ADDR); //Connecting to database

/************************** ROUTES *******************************/
app.use('/', indexPath);
app.use('/delete', deletePath);
app.use("/new", customListPath);


/************************** Server port *******************************/
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function(){
	console.log("Server has started");
});