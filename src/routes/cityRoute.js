const { getAll, create, getOne, remove, update } = require('../controllers/city.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');

const cityRoute = express.Router();

cityRoute.route('/cities')
    .get(getAll)
    .post(verifyJWT,create);

cityRoute.route('/cities/:id')
    .get(verifyJWT,getOne)
    .delete(verifyJWT,remove)
    .put(verifyJWT,update);

module.exports = cityRoute;