const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    // [true, 'errorString']
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    // default => will show if no rating is enter
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// "Tour" => var name and model name are similar for convenience
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
