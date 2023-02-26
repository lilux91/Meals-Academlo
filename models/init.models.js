const User = require('./user.model');
const Order = require('./order.model');
const Meal = require('./meal.model');
const Review = require('./review.model');
const Restaurant = require('./restaurant.model');

const initModel = () => {};

/* 1User <--------> M Order */
User.hasMany(Order);
Order.belongsTo(User);

/* 1User <--------> M reviews */
User.hasMany(Review);
Review.belongsTo(User);

/* 1Restaurant <--------> M reviews */
Restaurant.hasMany(Review);
Review.belongsTo(Restaurant);

/* 1Restaurant <--------> M meals */
Restaurant.hasMany(Meal);
Meal.belongsTo(Restaurant);

/* 1Order <--------> 1 Meal */
Order.hasOne(Meal);
Meal.belongsTo(Order);

module.exports = initModel;
