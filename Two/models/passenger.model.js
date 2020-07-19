module.exports = (sequelize, DataTypes) => {
    const Passenger = sequelize.define("passenger", {
        name: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        source: {
            type: DataTypes.STRING
        },
        destination: {
            type: DataTypes.STRING
        },
        phone: {
            type: DataTypes.INTEGER
        },
        departDate: {
            type: DataTypes.STRING
        },
        returnDate: {
            type: DataTypes.STRING
        },
        document: {
            type: DataTypes.STRING
        },
        total: {
            type: DataTypes.INTEGER
        },
        cost: {
            type: DataTypes.INTEGER
        },
        flightName: {
            type: DataTypes.STRING
        }
    });
    return Passenger;
};