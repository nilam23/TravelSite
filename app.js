var express = require("express"),
    mongoose = require("mongoose"),
    parser = require("body-parser"),
    Passenger = require("./models/passenger"),
    Flight = require("./models/flight");
var app = express();
const port = 3000;
var newPassenger;

app.use(parser.urlencoded({ extended: true }));
mongoose.connect("mongodb://localhost/travelSite", { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express.static("public"));
app.set("view engine", "ejs");

// Flight.create({
//     agency: "Spicejet",
//     name: "Spicejet Air",
//     price: 3000
// });

app.get("/", (req, res) => {
    res.render("index");
});

app.get("/new", (req, res) => {
    res.render("new");
});

app.post("/travel", (req, res) => {
    var source = req.body.source;
    var destination = req.body.destination;
    var agency = req.body.agency;
    var name = req.body.name;
    var email = req.body.email;
    var phone = parseInt(req.body.phoneNo);
    var departDate = req.body.departDate;
    var returnDate = req.body.returnDate;
    var total = parseInt(req.body.totalPassengers);
    var document = req.body.id;
    newPassenger = { name, email, phone, source, destination, departDate, returnDate, total, document };
    Passenger.create(newPassenger, (err, item) => {
        if (err)
            console.log(err);
        else {
            Flight.findOne({ agency }, (err, flight) => {
                if (err)
                    console.log(err);
                else {
                    cost = total * parseInt(flight.price);
                    item.cost = cost;
                    item.flight.push(flight);
                    res.render("passenger", { passenger: item });
                }
            });
        }
    });
});

app.listen(port, () => console.log(`Server running at port no ${port}`));