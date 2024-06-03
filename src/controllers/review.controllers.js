const catchError = require('../utils/catchError');
const Review = require('../models/Review.models');
const { where } = require('sequelize');
const User = require('../models/User.models');

const getAll = catchError(async(req, res) => {
    const { hotelId, offset, prePage } = req.query;
    const where = {};
    
    if(hotelId) where.hotelId = hotelId
    const results = await Review.findAll({
        include: [User],
        where,
        offset: offset,
        limit: prePage
    });
    return res.json(results);
});

const create = catchError(async(req, res) => {
    const { comment, rating, hotelId } = req.body;
    const result = await Review.create(
        { comment, rating, userId:req.user.id, hotelId}
    );
    return res.status(201).json(result);
});

const getOne = catchError(async(req, res) => {
    const { id } = req.params;
    const result = await Review.findByPk(id);
    if(!result) return res.sendStatus(404);
    return res.json(result);
});

const remove = catchError(async(req, res) => {

    const { id } = req.params;

    await Review.destroy({ where: {id} });
    return res.sendStatus(204);
});

const update = catchError(async(req, res) => {
    const { id } = req.params;
    const { comment, rating } = req.body;
    const result = await Review.update(
        {comment,rating},
        { where: {id}, returning: true }
    );
    if(result[0] === 0) return res.sendStatus(404);
    return res.json(result[1][0]);
});

module.exports = {
    getAll,
    create,
    getOne,
    remove,
    update
}