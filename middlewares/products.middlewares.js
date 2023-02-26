const Product = require('../models/product.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validProductById = catchAsync(async (req, res, next) => {
  //buscar el id
  const { id } = req.params;
  // buscar el producto
  const product = await Product.findOne({
    where: {
      id,
      status: true,
    },
  });

  if (!product) {
    return next(new AppError('Product not found', 404));
  }
  //Esto antes del next para que se pueda ejecutar
  req.product = product;
  next();
});
