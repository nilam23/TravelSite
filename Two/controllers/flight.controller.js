const db = require("../models");
const { flights } = require("../models");

const Flight = db.flights;
const Passenger = db.passengers;

exports.createFlight = (flight) => {
    return Flight.create({
        agency: flight.agency,
        name: flight.name,
        price: flight.price
    })
        .then((flight) => {
            console.log("Newly created flight: " + JSON.stringify(flight, null, 4));
            return flight;
        })
        .catch((err) => {
            console.log("Error while creating tutorial: ", err);
        });
};

exports.createPassenger = (flightId, passenger) => {
    return Passenger.create({
        name: passenger.name,
        email: passenger.email,
        source: passenger.source,
        destination: passenger.destination,
        departDate: passenger.departDate,
        phone: passenger.phone,
        returnDate: passenger.returnDate,
        document: passenger.document,
        total: passenger.total,
        cost: passenger.cost,
        flightName: passenger.flightName,
        flightId: flightId
    })
        .then((passenger) => {
            console.log("Newly created passenger: " + JSON.stringify(passenger, null, 4));
            return passenger;
        })
        .catch((err) => {
            console.log("Error while creating passenger: ", err);
        });
};

exports.findFlightById = (flightId) => {
    return Flight.findByPk(flightId, { include: ["passengers"] })
        .then((flight) => {
            return flight;
        })
        .catch((err) => {
            console.log("Error while finding flight: ", err);
        });
};

exports.findPassengerById = (id) => {
    return Passenger.findByPk(id, { include: ["flight"] })
        .then((passenger) => {
            return passenger;
        })
        .catch((err) => {
            console.log("Error while finding passenger: ", err);
        });
};