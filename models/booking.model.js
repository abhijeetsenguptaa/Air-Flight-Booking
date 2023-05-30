const mongoose = require('mongoose');


const bookingSchema = mongoose.Schema({
    userID: String,
    flightID: String
}, {
    versionKey: false
})


const BookingModel = mongoose.model('bookings', bookingSchema);


module.exports = { BookingModel };