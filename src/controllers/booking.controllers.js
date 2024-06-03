const catchError = require('../utils/catchError');
const Booking = require('../models/Booking.models');
const User = require('../models/User.models');
const Hotel = require('../models/Hotel.models');
const Image = require('../models/Image.models');
const City = require('../models/City.models');


const getAllUser = catchError(async (req, res) => {
    const { id } = req.user;
    const results = await Booking.findAll({ where: { userId: id }, include: [User, {
        model: Hotel,
        include: [Image, City]
    }] });
    return res.json(results);
});

const create = catchError(async (req, res) => {
    const { id } = req.user;
    const result = await Booking.create(
        { ...req.body, userId: id }
    );
    return res.status(201).json(result);
});

const getOne = catchError(async (req, res) => {
    const { id } = req.params;
    const result = await Booking.findByPk(id);
    if (!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    await Booking.destroy({ where: { id } });
    return res.sendStatus(204);
});

const update = catchError(async (req, res) => {
    const { id } = req.params;
    const { checkIn, checkOut } = req.body;
    const result = await Booking.update(
        { checkIn , checkOut },
        { where: { id }, returning: true }
    );
    if (result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAllUser,
    create,
    getOne,
    remove,
    update
}