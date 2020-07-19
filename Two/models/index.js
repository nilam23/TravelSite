const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.flights = require("./flight.model")(sequelize, Sequelize);
db.passengers = require("./passenger.model")(sequelize, Sequelize);

db.flights.hasMany(db.passengers, { as: "passengers" });
db.passengers.belongsTo(db.flights, {
    foreignKey: "flightId",
    as: "flight",
});

module.exports = db;