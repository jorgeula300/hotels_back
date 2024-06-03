const City = require('./City.models');
const Hotel = require('./Hotel.models');
const Image = require('./Image.models');
const Booking = require('./Booking.models');
const User = require('./User.models');
const Review = require('./Review.models');

Hotel.belongsTo(City);
City.hasMany(Hotel);

Hotel.hasMany(Image);
Image.belongsTo(Hotel);

User.hasMany(Booking);
Booking.belongsTo(User);

Hotel.hasMany(Booking);
Booking.belongsTo(Hotel);

Review.belongsTo(Hotel);
Hotel.hasMany(Review);

User.hasMany(Review);
Review.belongsTo(User);


