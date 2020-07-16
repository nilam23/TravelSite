var mongoose = require("mongoose");

var flightSchema = new mongoose.Schema({
    agency: String,
    name: String,
    price: Number
});

module.exports = mongoose.model("Flight", flightSchema);