const { Router } = require('express');
const { check } = require('express-validator');
const {
  findMeals,
  findMeal,
  createMeal,
  updateMeal,
  deleteMeal,
} = require('../controllers/meal.controller');
const {
  protect,
  protectAccountOwner,
} = require('../middlewares/auth.middlewares');
const { validMealById } = require('../middlewares/meals.middlewares');
const { validRoleUserAdmin } = require('../middlewares/user.middlewares');

const router = Router();

router.post(
  '/:id',
  [
    check('name', 'The name must be mandatory').not().isEmpty(),
    check('price', 'The name must be mandatory').not().isEmpty(),
    protect,
    validRoleUserAdmin,
  ],
  createMeal
);

router.get('/', findMeals);

router.get('/:id', findMeal);

router.patch('/:id', protect, validRoleUserAdmin, updateMeal);

router.delete('/:id', protect, validRoleUserAdmin, deleteMeal);

module.exports = {
  mealRouter: router,
};
