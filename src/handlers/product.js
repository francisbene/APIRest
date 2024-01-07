const productModel = require('../modules/product');
//Criando função transformer 
const transformer = product => ({
    type: 'products',
    id: product.id,
    attributes: {
      name: product.name,
      price: product.price,
    },
    links: {
      self: `/api/v1/products/${product.id}`
    }
  });
  
 const getAll = async () => {
    const products = await ProductRepository.getAll();
    return { data: products.map(transformer) };
 };

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