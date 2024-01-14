const productModel = require('../modules/product');

const transformer = product => ({
    type: 'products',
    id: product.id,
    attributes: {
      name: product.name,
      price: product.price,
    },
    links: {
      self: "/api/v1/products/${product.id}"
    }
  });

  
 const getAll = async () => {
    
    const products = await productModel.find({});
    return {data: products.map(transformer)};
 };

 const find = async (req) => {
    const product = await productModel.findById(req.params.id);
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
    await productModel.findOneAndDelete({_id: req.params.id});
    return h.response().code(204);
}

const update = async (req, h) => {
  const { name, price } = req.payload;

  try {
      const updatedProduct = await productModel.findByIdAndUpdate(
          req.params.id,
          { name, price },
          { new: true } // Retorna o documento atualizado
      );

      if (!updatedProduct) {
          return h.response().code(404); // Produto não encontrado
      }

      return h.response(transformer(updatedProduct)).code(200);
  } catch (error) {
      return h.response(error).code(500); // Tratar erros de forma apropriada
  }
};

module.exports = {
    getAll,
    save,
    remove,
    find,
    update
}