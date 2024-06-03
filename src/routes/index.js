const express = require('express');
const cityRoute = require('./cityRoute');
const hotelRoute = require('./hotelRoutes');
const imageRoute = require('./imageRoutes');
const userRouter = require('./userRoutes');
const bookingRoute = require('./bookingRoutes');
const reviewRoute = require('./reviewRoutes');
const router = express.Router();

// colocar las rutas aquí
router.use(userRouter)
router.use(cityRoute)
router.use(hotelRoute)
router.use(imageRoute)
router.use(bookingRoute)
router.use(reviewRoute)


module.exports = router;