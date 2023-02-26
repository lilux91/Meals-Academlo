const { Router } = require('express');
const { check } = require('express-validator');
const {
  findRestaurants,
  findRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/restaurant.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middlewares');
const { validRoleUserAdmin } = require('../middlewares/user.middlewares');
const { validOnlyOwner } = require('../middlewares/user.middlewares');

const router = Router();

router.post(
  '/',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('address', 'The address must be mandatory').not().isEmpty(),
    //check('rating', 'The rating must be mandatory'). , falta validacion de 1 a 5
    protect,
    validRoleUserAdmin,
  ],
  createRestaurant
);

router.get('/', findRestaurants);

router.get('/:id', findRestaurant);

router.patch('/:id', protect, validRoleUserAdmin, updateRestaurant);

router.delete('/:id', protect, validRoleUserAdmin, deleteRestaurant);

router.post('/reviews/:id', protect, createReview);

router.patch(
  '/reviews/:restaurantId/:id',
  protect,
  validOnlyOwner,
  updateReview
);

router.delete(
  '/reviews/:restaurantId/:id',
  protect,
  validOnlyOwner,
  deleteReview
);

module.exports = {
  restaurantRouter: router,
};
