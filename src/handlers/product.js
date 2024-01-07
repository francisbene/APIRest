const productModel = require('../modules/product');

const transformer = product => ({
    type: 'products',
    id: product.id,
    attributes: {
      name: product.name,
      price: product.price,
    },
    links: {
      self: '/api/v1/products/${product.id}'
    }
  });

  
 const getAll = async () => {
    
    const products = await productModel.find({});
    return {data: products.map(transformer)};
 };

 const find = async (req) => {
    const product = await ProductModel.findById(req.params.id);
    return { data: transformer(product) };
  };
  

const save = async (req, h) => {
    const {name, price} = req.payload;

    const product = new productModel;
    product.name = name;
    product.price = price;

    await product.save();

    return h.response(transformer(product)).code(201);
}

const remove = async (req, h) => {
    await ProductModel.findOneAndDelete({_id: req.params.id});
    return h.response().code(204);
 }
  

module.exports = {
    getAll,
    save,
    remove,
    find
}