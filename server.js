const express = require('express');
const cors = require('cors');
const { connection } = require('./configs/connection');
const { userRoute } = require('./routes/user.route');
const { flightRoute } = require('./routes/flight.route');
const { bookingRoute } = require('./routes/booking.route');




require('dotenv').config();
const PORT = process.env.port || 8080

const app = express();
app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.status(200).send({
        'msg': 'Welcome to the Air Flight Booking Portal!'
    })
})


app.use('/api', userRoute);
app.use('/api', flightRoute);
app.use('/api', bookingRoute);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Server is connected to the Database!');
    } catch {
        console.log('Server could not get connected to the Database!');
    }
    console.log(`Server is running at the port : ${PORT}`);
})