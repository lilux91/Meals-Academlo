const { Router } = require('express');
const { check } = require('express-validator');
const {
  findOrders,
  findOrder,
  createOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middlewares');
const { validMealById } = require('../middlewares/meals.middlewares');
const { validRoleUserAdmin } = require('../middlewares/user.middlewares');

const router = Router();

router.post('/', protect, createOrder);

router.get('/:id', protect, findOrders);

router.patch('/:id', protect, updateOrder);

router.delete('/:id', protect, deleteOrder);

module.exports = {
  ordersRouter: router,
};
