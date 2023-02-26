const catchAsync = fn => {
  //recibe una funcion
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
