const express = require('express');
const { FlightModel } = require('../models/flight.model');



const flightRoute = express.Router();

flightRoute.get('/flights', async (req, res) => {
    try {
        const flightData = await FlightModel.find();
        res.status(200).send({
            'msg': 'Here are all the details of the Flight..',
            'data': flightData
        })

    } catch {
        res.status(404).send({
            'msg': 'Error in fetching the data from the flight route.'
        })
    }
})

flightRoute.get('/flights/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const flightData = await FlightModel.find({ _id: id });
        res.status(200).send({
            'msg': `Here is the details of the Flight with ID: ${id}`,
            'data': flightData
        })
    } catch {
        res.status(404).send({
            'msg': 'Error in fetching the data from the flight route.'
        })
    }
})

flightRoute.post('/flights', async (req, res) => {
    try {
        const { airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price } = req.body;
        const newFlight = new FlightModel({ airline, flightNo, departure, arrival, departureTime, arrivalTime, seats, price });
        await newFlight.save();
        res.status(201).send({
            'msg': 'New Flight has been Added..'
        })
    } catch {
        res.status(404).send({
            'msg': 'Error in adding the new flight..'
        })
    }
})

flightRoute.patch('/flights/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        await FlightModel.findByIdAndUpdate({ _id: id }, data);
        res.status(200).send({
            'msg': `Flight Details with ID : ${id} has been updated.`,
            'updatedData': await FlightModel.find({_id:id})
        })
    } catch {
        res.status(404).send({
            'msg': `Error in updating the details of the flight details with ID : ${id}.`
        })
    }
})

flightRoute.delete('/flights/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await FlightModel.findByIdAndDelete({ _id: id });
        res.status(202).send({
            'msg': `Flight details with ID : ${id} has been deleted.`,
            'data': await FlightModel.find()
        })
    } catch {
        res.status(404).send({
            'msg': `Error in deleting the flight data with ID : ${id}.`
        })
    }
})


module.exports = { flightRoute };