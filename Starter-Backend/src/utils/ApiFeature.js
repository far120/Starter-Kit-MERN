class APIFeatures {
  constructor(Model, query) {
    this.Model = Model;
    this.queryObj = { ...query };
    this.query = Model.find();
    this.pagination = {};
  }

  // ======================
  // 📌 FILTER (query only)
  // ======================
  filter() {
    const excluded = ['page', 'limit', 'sort', 'select'];

    const filterObj = { ...this.queryObj };

    excluded.forEach(f => delete filterObj[f]);

    let filterString = JSON.stringify(filterObj);
    filterString = filterString.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      match => `$${match}`
    );

    this.query = this.query.find(JSON.parse(filterString));

    return this;
  }

  // ======================
  // 📌 SORT
  // ======================
  sort(defaultSort = '-createdAt') {
    const sortBy = this.queryObj.sort
      ? this.queryObj.sort.split(',').join(' ')
      : defaultSort;

    this.query = this.query.sort(sortBy);

    return this;
  }

  // ======================
  // 📌 SELECT
  // ======================
  select(forbidden = ['password', '__v']) {
    if (this.queryObj.select) {
      const fields = this.queryObj.select
        .split(',')
        .filter(f => !forbidden.includes(f))
        .join(' ');

      this.query = this.query.select(fields);
    }

    return this;
  }

  // ======================
  // 📌 PAGINATION
  // ======================
  paginate(options = {}) {
    const { defaultLimit = 10, maxLimit = 100 } = options;

    const page = Math.max(+this.queryObj.page || 1, 1);

    let limit = +this.queryObj.limit || defaultLimit;

    if (limit > maxLimit) limit = maxLimit;

    const skip = (page - 1) * limit;

    this.pagination = { page, limit };

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }

  // ======================
  // 📌 POPULATE (Mongoose style)
  // ======================
  populate(path, select = '') {
    this.query = this.query.populate(path, select);
    return this;
  }

  // ======================
  // 📌 EXECUTE (🔥 FINAL RESPONSE READY)
  // ======================
  async execute() {
    const data = await this.query;

    const totalResults = await this.Model.countDocuments();

    const { page, limit } = this.pagination;

    return {
      status: 'success',
      page,
      limit,
      totalPages: Math.ceil(totalResults / limit),
      totalResults,
      resultsCount: data.length,
      data
    };
  }
}

module.exports = APIFeatures;