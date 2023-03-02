const Meal = require('../models/meal.model');
const Restaurant = require('../models/restaurant.model');
const catchAsync = require('../utils/catchAsync');

const findMeals = catchAsync(async (req, res, next) => {
  const meals = await Meal.findAll({
    where: {
      status: 'active',
    },
    include: [{ model: Restaurant }],
  });

  return res.status(200).json({
    status: 'success',
    meals,
  });
});

const findMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: {
      id,
      status: 'active',
    },
    include: [{ model: Restaurant }],
  });
  res.status(200).json({
    status: 'success',
    meal,
  });
});

const createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params; // idRestaurant
  const { name, price } = req.body;
  const meal = await Meal.create({
    name: name.toLowerCase(),
    price: price,
    restaurantId: id,
    status: 'active',
  });

  res.status(201).json({
    status: 'success',
    meal,
  });
});

const updateMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name, price } = req.body;

  const meal = await Meal.findOne({
    where: {
      id,
    },
  });

  await meal.update({ name, price });

  res.status(200).json({
    status: 'success',
    message: 'Meal updated successfully',
  });
});

const deleteMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await Meal.findOne({
    where: {
      id,
    },
  });

  const status = 'inactive';
  await meal.update({ status });
  res.status(200).json({
    status: 'success',
    message: 'Meal deleted successfully',
  });
});

module.exports = {
  findMeals,
  findMeal,
  createMeal,
  updateMeal,
  deleteMeal,
};
