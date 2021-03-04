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
            favoriteUser: req.user.favoriteUser,
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
    });

    //edit a bit
    app.get("/api/bits/:id", function(req, res) {
        db.Bit.findOne({
          where: {
            id: req.params.id
          }
        })
          .then(function(dbBit) {
            res.json(dbBit);
          });
      });

    //get user by id
    app.get("/api/getSingleUser/:id", function(req, res) {
        db.User.findOne({
          where: {
              id: req.params.id
          }
        }).then(function(dbUser) {
            res.json(dbUser)
        })

    })

    //update bit
    app.put("/api/getAllBits", function(req, res) {
        db.Bit.update(req.body,
          {
             where: {
                id: req.body.id
              }
            })
            .then(function(dbBit) {
              res.json(dbBit);
            });
        });  

    //save a user to logged in user
    app.put("/api/saveUsertoUser", function(req, res) {
        db.User.update({
            favoriteUser: req.body.favoriteUser
        },
            {
             where: {
                 //maybe .then cause req.body.id isnt pulling up
                id: req.user.id
                }
            })
            .then(function(dbBit) {
                res.json(dbBit)
                console.log("hi")
            });
        });  

    app.get("/api/getAllUsers", function(req, res) {
        db.User.findAll({
            include: [db.Bit]
        }).then(function(dbUser) {
            res.json(dbUser)
        })
    })
}