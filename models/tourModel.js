const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      // [true, 'errorString']
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name cannot have more than 40 characters'],
      minlength: [10, 'A tour name must have at least 10 characters'],
      // // validator.isAlpha => external library to validate that name contains only letters
      // validate: [validator.isAlpha, 'Tour name must only contain characters'],
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      // default => will show if no rating is enter
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
      set: (val) => Math.round(val * 10) / 10,
      // Math.round(4.66 * 10) = 47
      // 47 / 10 = 4.7
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price',
        // {VALUE} => Mongoose can access the Value we enter this way
      },
    },
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
    secretTour: {
      type: Boolean,
      default: false,
    },
    startLocation: {
      // GeoJSON
      type: {
        type: String,
        default: 'Point',
        enum: ['Point'],
      },
      coordinates: [Number],
      address: String,
      description: String,
    },
    // [Embedded doccument] => to create embedded document "[]"
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point'],
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number,
      },
    ],
    guides: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
  },
  // Options for Virtual Fields
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//____________________________________________________________________
// #19 - s11
// Improving Read Perfomance with Indexes

// tourSchema.index({ price: 1 });

// price: 1 => will be starting to search from (Low~High)
// ratingsAverage: -1 => will start to search from (High~Low)
tourSchema.index({ price: 1, ratingsAverage: -1 });
tourSchema.index({ slug: 1 });
// Options for Map rendering with MongoDB - (#23 -s11)
tourSchema.index({ startLocation: '2dsphere' });

//___________________________________________________________

// Create a temporary field "durationWeeks" , that will not be saved
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// ___________________________________________________________
// #9 - s11
// Virtual Populate: Tours and Reviews

// .virtual() => Create a temporary field
tourSchema.virtual('reviews', {
  ref: 'Review',
  // => Connecting the "_id" to the "tour"
  foreignField: 'tour',
  // => reviewModel.tour => reference to the other model
  localField: '_id',
  // .this"_id" = foreingField
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

// ___________________________________________________________
// #3 - s11
// Modelling tours guides: Embedding

// tourSchema.pre('save', async function (next) {
//   // Get all Ids from "this.guides" => ForEach find user by Id => Re store User to "this.guides"
//   const guidesPromises = this.guides.map(async (id) => await User.findById(id));
//   this.guides = await Promise.all(guidesPromises);
//   next();
// });

// ___________________________________________________________

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
// #23 - S-8
// Query Middleware: Runs when .find() is called

// tourSchema.pre('find', function (next) {
// /^find/ => regular Expression
tourSchema.pre(/^find/, function (next) {
  // Runs when ".find()" is called somewhere in the code
  // .this => query => what ".find()" is returned in "getAllTours"

  this.find({ secretTour: { $ne: true } });
  // .find() => All secretTour that are not true

  this.start = Date.now();
  next();
});
// ___________________________________________________________
// #5 - 11s
// Populating Tour Guides
tourSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt',
  });
  next();
});
// ___________________________________________________________

tourSchema.post(/^find/, function (docs, next) {
  // To show that this runs after the code on top
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// ___________________________________________________________
// #24 - S-8
// Aggregation Middleware
// To make/add changes in a "pipeline" before executing

tourSchema.pre('aggregate', function (next) {
  // .unshift() => JS ARR method => too add at the beggining of ARR
  // this.pipeline() => Tour.aggregate([pipeline])
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this._pipeline);
  next();
});

// ___________________________________________________________

// "Tour" => var name and model name are similar for convenience
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
