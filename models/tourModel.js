const mongoose = require('mongoose');
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // [true, 'errorString']
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
    },
    slug: String,
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
      // Exclude Field Defaul
      select: false,
    },
    // Array of only "Date"
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// ___________________________________________________________
// #22 - S-8
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  // slugify => npm i => import
  // .this => all results/Objects
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('Will save doc...');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   // doc => results from tourSchema.pre()
//   console.log(doc);
//   next();
// });
// ___________________________________________________________

// "Tour" => var name and model name are similar for convenience
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
