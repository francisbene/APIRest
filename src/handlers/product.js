const productModel = require('../modules/product');

const getAll = (request, h) => {
    return 'Hello World!';
}

const save = async (req, h) => {
    const {name, price} = req.payload;

    const product = new productModel;
    product.name = name;
    product.price = price;

    await product.save();

    return h.response({data: product}).code(201);
}

module.exports = {
    getAll,
    save
}