const { getAll, create, getOne, remove, update } = require('../controllers/review.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const reviewRoute = express.Router();

reviewRoute.route('/reviews')
    .get(getAll)
    .post(verifyJWT,create);

reviewRoute.route('/reviews/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = reviewRoute;