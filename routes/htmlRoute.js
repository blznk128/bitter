const path = require('path');
var isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function(app) {
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"))
    });

    app.get("/register", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/register.html"))
    });

    app.get("/members", isAuthenticated, function(req, res) {
        res.sendFile(path.join(__dirname, "../public/userHome.html"));
      });
}