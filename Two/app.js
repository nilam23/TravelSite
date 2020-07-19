var express = require("express"),
    parser = require("body-parser");
var app = express();

const port = 3000;
var newPassenger;
var name;
var email;
var phone;
var source;
var destination;
var departDate;
var returnDate;
var agency;
var document;
var id;
var total;
var flightName;

//MySQL
const db = require("./models/index");
const controller = require("./controllers/flight.controller");

app.use(parser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.get("/passenger", (req, res) => {
    res.render("passenger", { passenger: newPassenger });
});

app.post("/travel", (req, res) => {
    name = req.body.name;
    email = req.body.email;
    source = req.body.source;
    destination = req.body.destination;
    phone = parseInt(req.body.phoneNo);
    departDate = req.body.departDate;
    returnDate = req.body.returnDate;
    document = req.body.id;
    agency = req.body.agency;
    total = parseInt(req.body.totalPassengers);
    id = agency.split(' ')[1];
    id = parseInt(id);
    db.sequelize.sync({
        // force: true
    }).then(() => {
        run();
    });
    setTimeout(() => {
        res.redirect("/passenger");
    }, 2000);
});

const run = async () => {
    // const flight1 = await controller.createFlight({
    //     agency: "Indigo",
    //     name: "Indigo air 1",
    //     price: 3000
    // });

    const flightData = await controller.findFlightById(id);
    const cost = flightData.dataValues.price * total;
    flightName = flightData.dataValues.name;

    newPassenger = await controller.createPassenger(id, {
        name,
        email,
        source,
        destination,
        phone,
        departDate,
        returnDate,
        document,
        total,
        cost,
        flightName
    });
    newPassenger = newPassenger.dataValues;
}

app.listen(port, () => console.log(`Server running at port no ${port}`));