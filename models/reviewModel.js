// review / rating / createdAt / ref to tour / ref to user
const mongoose = require('mongoose');
const Tour = require('./tourModel');
const User = require('./userModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  // Options for Virtual Fields
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
//___________________________________________________________________________
// #22
// Preventing Duplicate Reviews

reviewSchema.index({ tour: 1, user: 1 }, { unique: true });
// => "user" can only have 1 "review" in the "tour"

//___________________________________________________________________________
reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: 'tour',
  //   select: 'name',
  // })

  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

//___________________________________________________________________________
// #20 - s11
// Calculating Average Rating on Tours - P1

reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      // find tours with "tourId"
      $match: { tour: tourId },
    },
    {
      $group: {
        // What to group
        _id: '$tour',
        // +1 for each rating found
        nRating: { $sum: 1 },
        // $avr operator => to calculate average of "rating"
        avgRating: { $avg: '$rating' },
        // "$" => for MongoDB to recognize
      },
    },
  ]);
  // console.log(stats);

  // Updating Tour Ratings
  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      // stats[0] => where "nRating/avgRating" is stored
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      // 4.5 => default in schema
      ratingsAverage: 4.5,
    });
  }
};

// .post => Run "calcAverageRatings()" after a Review is created
// Middlewares run after "save()" or "create()"
reviewSchema.post('save', function () {
  // this => current document
  // this.constructor => the model who created "this"
  this.constructor.calcAverageRatings(this.tour);

  // Review.calcAverageRatings(this.tour)
  // => will not work because this middleware will be called in a different module when "save()/create()"
});
//___________________________________________________________________________
// #21 - s11
// Calculating Average Rating on Tours - P2

// This is for
// => findOneAndUpdate
// => findOneAndDelete

reviewSchema.pre(/^findOneAnd/, async function (next) {
  // Create "r" => contains findOne() data
  this.r = await this.findOne();
  //console.log(this.r);
  next();
});

reviewSchema.post(/^findOneAnd/, async function () {
  // "await this.findOne();" does not work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});

//___________________________________________________________________________

const Review = mongoose.model('Review', reviewSchema);
module.exports = Review;
