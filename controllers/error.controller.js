const AppError = require('../utils/appError');

// const handleCastError22P02 = err => {
//   const message = 'Some type of data send does not match was expected';
//   return new AppError(message, 400);
// };

const handleCastError22P02 = () =>
  new AppError('Some type of data send does not match was expected', 400);

const handleJWTError = () =>
  new AppError('Invalid Token. Please login again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired! Please login again.', 401);

//Errores de desarrollo
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      //el mensaje de mi clase del AppError
      message: err.message,
    });
  } else {
    //Programming or other unknown error: don't leak error details
    console.error('ERROR 🧨', err);
    res.status(500).json({
      status: 'fail',
      message: 'Something went very wrong!',
    });
  }
};

//aca
const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'fail';

  //
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  }

  if (process.env.NODE_ENV === 'production') {
    //defino el error
    let error = { ...err };
    //if (error.parent.code === '22P02') error = handleCastError22P02(error);

    if (!error.parent?.code) {
      error = err;
    }
    //error de tipos
    if (error.parent?.code === '22P02') error = handleCastError22P02(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
    if (error.name === 'TokenExpiredError')
      error = handleJWTExpiredError(error);

    sendErrorProd(error, res);
  }
};

module.exports = globalErrorHandler;
