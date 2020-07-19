module.exports = (sequelize, DataTypes) => {
    const Flight = sequelize.define("flight", {
        agency: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.INTEGER
        }
    });
    return Flight;
};