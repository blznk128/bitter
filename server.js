const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080 ;
const db = require('./models');
const session = require('express-session');
const passport = require('./config/passport');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({ secret: "penguin", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

require('./routes/apiRoute')(app);
require('./routes/htmlRoute')(app);

db.sequelize.sync( { force: false } ).then(function() {
    app.listen(PORT, () => {
        console.log("app is listening on: ", PORT)
    })
})