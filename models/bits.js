module.exports = (sequelize, DataTypes) => {
    let Bit = sequelize.define("Bit", {
        bit: {
            type: DataTypes.STRING,
            allowNull: true
        }
    })

    Bit.associate = (models) => {
        Bit.belongsTo(models.User, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Bit
}