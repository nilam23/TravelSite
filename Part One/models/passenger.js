var mongoose = require("mongoose");

var passengerSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    source: String,
    destination: String,
    departDate: String,
    returnDate: String,
    total: Number,
    document: String,
    cost: Number,
    flight: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Flight"
        }
    ]
});

module.exports = mongoose.model("Passenger", passengerSchema);