const express = require('express');
const dotenv = require('dotenv');
const db = require('./config/mongoose');
const session = require('express-session');
// const passport = require('passport');
// const passportLocal = require('./config/passport-local-startegy');
const port = process.env.PORT || 3200;

const app = express();

// listen on port
app.listen(port, function (error) {
	if (error) {
		console.log(`Error in connecting to server: ${error}`);
		return;
	}
	console.log(`Server is up and running on port: ${port}`);
});