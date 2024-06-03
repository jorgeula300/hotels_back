const { getAllUser, create, getOne, remove, update} = require('../controllers/booking.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const bookingRoute = express.Router();

bookingRoute.route('/bookings')
    .get( verifyJWT,getAllUser)
    .post(verifyJWT,create);


bookingRoute.route('/bookings/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);



module.exports = bookingRoute;