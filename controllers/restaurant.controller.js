const Restaurant = require('../models/restaurant.model');
const Review = require('../models/review.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

//todo: Revisar logica
const findRestaurants = catchAsync(async (req, res, next) => {
  // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS PENDING
  const restaurants = await Restaurant.findAll({
    where: {
      status: 'active',
    },
    include: [{ model: Review }],
  });

  // 2. ENVIAR UNA RESPUESTA AL USUARIO
  return res.status(200).json({
    status: 'success',
    restaurants,
  });
});

const findRestaurant = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;

  // 2. BUSCAR AL USUARIO CON EL ID QUE VENIA DE LOS PARAMETROS
  const restaurant = await Restaurant.findOne({
    where: {
      id,
    },
    include: [{ model: Review }],
  });

  // 4. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(200).json({
    status: 'success',
    restaurant,
  });
});

const createRestaurant = catchAsync(async (req, res, next) => {
  //1. OBTENER LA INFORMACION DE LA REQ.BODY
  const { name, address, rating } = req.body;
  //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
  const restaurant = await Restaurant.create({
    name: name.toLowerCase(),
    address: address.toLowerCase(),
    rating: rating,
    status: 'active',
  });
  //3. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(201).json({
    status: 'success',
    restaurant,
  });
});

const updateRestaurant = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  const { name, address } = req.body;

  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA PENDING
  const restaurant = await Restaurant.findOne({
    where: {
      id,
    },
  });

  await restaurant.update({ name, address });

  // 3. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'Restaurant updated successfully',
  });
});

const deleteRestaurant = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA TRUE
  const restaurant = await Restaurant.findOne({
    where: {
      id,
    },
  });

  // 3. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
  const status = 'inactive';
  await restaurant.update({ status });
  // 4. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'Restaurant deleted successfully',
  });
});

const createReview = catchAsync(async (req, res, next) => {
  //1. OBTENER LA INFORMACION DE LA REQ.BODY
  const { id } = req.params;
  const { comment, rating } = req.body;

  const { sessionUser } = req;
  //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
  const review = await Review.create({
    comment: comment.toLowerCase(),
    rating: rating,
    restaurantId: id,
    userId, //todo:tengo que scar el user id del token
  });
  //3. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(201).json({
    status: 'success',
    review,
  });
});

const updateReview = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { restaurantId, id } = req.params;
  const { comment, rating } = req.body;

  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA PENDING
  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
    },
  });

  await review.update({ comment, rating });

  // 3. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'Review updated successfully',
  });
});

const deleteReview = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { restaurantId, id } = req.params;

  // 2. OBTENER UN USUARIO POR SU ID Y QUE EL STATUS SEA PENDING
  const review = await Review.findOne({
    where: {
      id,
      restaurantId,
    },
  });

  const status = 'deleted';
  await review.update({ status });

  // 3. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'Review deleted successfully',
  });
});

module.exports = {
  findRestaurants,
  findRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  createReview,
  updateReview,
  deleteReview,
};
