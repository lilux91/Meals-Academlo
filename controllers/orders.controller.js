const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const findOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.findAll({
    where: {
      status: 'active',
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'Orders was found successfully',
    orders,
  });
});

const findOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await Order.findOne({
    where: {
      id: id,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Order was found successfully',
    order,
  });
});

const createOrder = catchAsync(async (req, res, next) => {
  //todo: implementar
  res.status(201).json({
    status: 'success',
    // order,
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  //todo: implementar
  res.status(200).json({
    status: 'success',
    message: 'Order updated successfully',
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  //todo: implementar
  res.status(200).json({
    status: 'success',
    message: 'Order deleted successfully',
  });
});

module.exports = {
  findOrders,
  findOrder,
  createOrder,
  updateOrder,
  deleteOrder,
};
