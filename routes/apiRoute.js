const db = require('../models');
var passport = require("../config/passport");

module.exports = (app) => {
    //creates new user
    app.post("/api/newUser", (req, res) => {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        }).then(dbUser => {
            res.json(dbUser)
            console.log("new user: ", dbUser)
        })
    })

    //logging in route
    app.post("/api/login", passport.authenticate("local"), function(req, res) {
        res.json("/members");
      });

     app.get("/api/user_data", function(req, res) {
        if (!req.user) {

        res.json({});
        } else {
            res.json({
            email: req.user.email,
            id: req.user.id
            });
        }
    }); 

    //logging out
    app.get("/logOut", function(req,res) {
        req.logout();
        res.redirect("/")
    })

    //save bit
    app.post("/api/saveBit", (req, res) => {
        db.Bit.create(
            req.body
        )
        .then((dbBit) => {
            res.json(dbBit)
        })
    });  

    //get all bits
    app.get("/api/getAllBits", (req, res) => {
        db.Bit.findAll({ order: [['createdAt', 'ASC']],
            include: [db.User]
        }).then((dbBit) => {
            res.json(dbBit)
        })
    });

    //delete a bit
    app.delete("/api/deleteBit/:id", (req, res) => {
        db.Bit.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbBit) {
            res.json(dbBit)
        })
    })
}