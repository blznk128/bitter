var bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) => {
    let User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        favoriteUser: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    })
    User.prototype.validPassword = function(password) {
        return (this.password === password)
      };

      User.associate = (models) => {
        User.hasMany(models.Bit, {
            onDelete: "cascade",
        });
    };

    // User.hook("beforeCreate", function(user) {
    //     user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    //   });
    return User
}