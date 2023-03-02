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
  const { mealId, userId, totalPrice, quantity } = req.body;
  const order = await Order.create({
    mealId,
    userId,
    totalPrice,
    quantity,
  });

  res.status(201).json({
    status: 'success',
    message: 'Order created successfully',
    order,
  });
});

const updateOrder = catchAsync(async (req, res, next) => {
  //todo: implementar

  const { id } = req.params;

  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA PENDING
  const order = await Order.findOne({
    where: {
      status: 'active',
      id,
    },
  });

  const status = 'completed';
  await order.update({ status });

  res.status(200).json({
    status: 'success',
    message: 'Order updated successfully',
  });
});

const deleteOrder = catchAsync(async (req, res, next) => {
  //todo: implementar

  const { id } = req.params;
  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
  const order = await Order.findOne({
    where: {
      //status: 'pending',
      id,
    },
  });

  // 3. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
  const status = 'cancelled';
  await order.update({ status });

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
