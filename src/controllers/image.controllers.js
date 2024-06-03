const catchError = require('../utils/catchError');
const Image = require('../models/Image.models');
const { uploadToCloudinary, deleteFromCloudinary } = require('../utils/cloudinary');

const getAll = catchError(async (req, res) => {
    const images = await Image.findAll();
    return res.json(images);
});


const create = catchError(async (req, res) => {
    if (!req.file) return res.status(400).json({ message: "No se envio ninguna imagen" });
    const { url } = await uploadToCloudinary(req.file)
    const { hotelId } = req.body
    const image = await Image.create({
        url,
        hotelId
    });
    return res.status(201).json(image);
});

const remove = catchError(async (req, res) => {
    const { id } = req.params;
    const image = await Image.findByPk(id);
    if (!image) return res.sendStatus(404);
    await deleteFromCloudinary(image.url);
    await Image.destroy({ where: { id } });
    return res.sendStatus(204);
});



module.exports = {
    getAll,
    create,
    remove
}