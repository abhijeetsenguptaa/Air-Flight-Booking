const express = require('express');
const { authentication } = require('../middleware/authentication.middleware');
const { BookingModel } = require('../models/booking.model');



const bookingRoute = express.Router();



bookingRoute.get('/dashboard', authentication, async (req, res) => {
    try {
        const data = await BookingModel.find({ userID: req.body.userID });
        res.status(200).send({
            'msg': 'All the details of the flights you have Booked.',
            'booking-details': data
        })
    } catch {
        res.status(404).send({
            'msg':'Error in fetching the data of the Booked Flights.'
        })
    }
})


bookingRoute.post('/booking', authentication, async (req, res) => {
    try {
        const { userID, flightID } = req.body;
        const newBooking = new BookingModel({ userID, flightID });
        await newBooking.save()
        res.status(200).send({
            'msg': 'Your flight has been Booked.',
            'data': newBooking
        })
    } catch {
        res.status(404).send({
            'msg': 'Error in booking a new flight.'
        })
    }
})



module.exports = { bookingRoute };