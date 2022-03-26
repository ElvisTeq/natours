const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    // [true, 'errorString']
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    // default => will show if no rating is enter
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    // Remove empty spaces from back and front, Only works for "String"
    trim: true,
    required: [true, 'A tour must have a description'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    // String => because we just need the name of the img for reference
    type: String,
    required: [true, 'A tour must have a cover image'],
  },
  // Array containing only strings
  images: [String],
  createdAt: {
    // Date => another type of data
    type: Date,
    // Returns times in miliseconds, but MongoDB will parse this for us
    default: Date.now(),
  },
  // Array of only "Date"
  startDates: [Date],
});

// "Tour" => var name and model name are similar for convenience
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
