const User = require('../models/user.model');
const Order = require('../models/order.model');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.findUsers = catchAsync(async (req, res, next) => {
  // 1. BUSCAR TODOS LOS USUARIOS QUE ESTAN CON STATUS TRUE
  const users = await User.findAll({
    attributes: ['id', 'name', 'email'],
    where: {
      status: 'available',
    },
  });

  // 2. ENVIAR UNA RESPUESTA AL USUARIO
  return res.status(200).json({
    status: 'success',
    message: 'Users was found successfully',
    users,
  });
});

exports.findUser = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  // 4. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(200).json({
    status: 'success',
    message: 'User was found successfully',
    user,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  //1. OBTENER LA INFORMACION DE LA REQ.BODY
  const { name, email, password, role } = req.body;
  //2. CREAR EL USUARIO CON LA INFORMACION DE LA REQ.BODY
  const user = await User.create({
    name: name.toLowerCase(),
    email: email.toLowerCase(),
    password,
    role, //client or employee
  });
  //3. ENVIAR UNA RESPUESTA AL USUARIO
  res.status(201).json({
    status: 'success',
    message: 'User created successfully',
    user,
  });
});

exports.updateUser = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS

  const { id } = req.params;
  const { name, email } = req.body;
  // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  // 5. REALIZAR LA ACTUALIZACIÓN DEL USUARIO, CAMPOS USERNAME, EMAIL
  //  await user.update({ name, email });
  const updateUser = await user.update({
    name,
    email,
  });

  // 6. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'User updated successfully',
    updateUser,
  });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  // 1. OBTENER EL ID DE LOS PARAMETROS
  const { id } = req.params;
  // 2. OBTENER LA INFORMACION A ACTUALIZAR DE LA REQ.BODY
  const user = await User.findOne({
    where: {
      id: id,
    },
  });

  // 4. REALIZAR LA ACTUALIZACIÓN DEL STATUS DEL USUARIO ENCONTRADO ANTERIORMENTE
  await user.update({ status: 'unavailable' });
  // 5. ENVIAR UNA RESPUESTA AL CLIENTE
  res.status(200).json({
    status: 'success',
    message: 'User deleted successfully',
  });
});

//Actualizar la contraseña
exports.updatePassword = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { currentPassword, newPassword } = req.body;

  if (!(await bcrypt.compare(currentPassword, user.password))) {
    return next(new AppError('Incorrect password', 401));
  }

  const salt = await bcrypt.genSalt(10);
  const encriptedPassword = await bcrypt.hash(newPassword, salt);

  await user.update({
    password: encriptedPassword,
    passwordChangeAt: new Date(),
  });
  res.status(200).json({
    status: 'success',
    message: 'The user password was updated successfylly',
  });
});

exports.findOrders = catchAsync(async (req, res, next) => {
  const { idUser } = req.params;

  const orders = await Order.findAll({
    where: {
      userId: idUser,
    },
  });

  return res.status(200).json({
    status: 'success',
    message: 'Orders was found successfully',
    orders,
  });
});

exports.findOrder = catchAsync(async (req, res, next) => {
  const { idUser, idOrder } = req.params;
  const order = await Order.findOne({
    where: {
      id: idOrder,
      userId: idUser,
    },
  });

  res.status(200).json({
    status: 'success',
    message: 'Order was found successfully',
    order,
  });
});
