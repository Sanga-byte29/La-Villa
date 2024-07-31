const mongoose = require("mongoose");


const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: [String],
    },
    desc: {
        type: String,
        required: true
    },
    roomNumbers: {
        type: [{
            number: Number,
            unavailableDates: [Date]
        }]
    }


});

module.exports = mongoose.model("Room",roomSchema)