class APIFeatures {
  constructor(query, queryString) {
    // All Tours => Data
    this.query = query;
    // req.query => URL
    this.queryString = queryString;
  }

  filter() {
    // 1) Filtering
    // Creating a hard copy => destructuring
    // => Deleting excluded fields
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // req.query => queryString => ?duration=5&difficulty=easy

    // 1B) Advanced Filtering

    // Convert into string => to use ".replace" method
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // \b => Exactly the same, words that include them won't count
    // g => Global, to make changes on all, if not added will just change the first one

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  sort() {
    // 2) Sorting
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      // sort = price,ratingsAverage
      // We need => sort = price ratingsAverage => for .sort() to work
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
      // Sort by creation time "new~old"
    }
    return this;
  }

  limitFields() {
    // 3) Field Limiting
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
      // "-" => Exclusion for .select()
    }
    return this;
  }

  paginate() {
    // 4) Pagination
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

module.exports = APIFeatures;
