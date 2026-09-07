class APIFeatures {

  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }


  filter() {

    const queryObj = { ...this.queryString };

    delete queryObj.page;
    delete queryObj.limit;
    delete queryObj.sort;
    delete queryObj.keyword;

    this.query = this.query.find(queryObj);

    return this;
  }


  sort() {

    if (this.queryString.sort) {

      const sortBy = this.queryString.sort
        .split(',')
        .join(' ');

      this.query = this.query.sort(sortBy);

    } else {

      this.query = this.query.sort('-createdAt');

    }

    return this;
  }


  search() {

    if (this.queryString.keyword) {

      const keyword = this.queryString.keyword;

      this.query = this.query.find({
        $or: [
          {
            name: {
              $regex: keyword,
              $options: 'i'
            }
          },
          {
            description: {
              $regex: keyword,
              $options: 'i'
            }
          }
        ]
      });

    }

    return this;
  }


  async paginate() {
    const page = Number(this.queryString.page) || 1;
    const limit = Number(this.queryString.limit) || 10;

    const skip = (page - 1) * limit;

    const totalProducts = await this.query.clone().countDocuments();

    const totalPages = Math.ceil(totalProducts / limit);

    const nextPage =
      page < totalPages
        ? page + 1
        : null;

    const previousPage =
      page > 1
        ? page - 1
        : null;

    this.query = this.query
      .skip(skip)
      .limit(limit);

    this.pagination = {
      currentPage: page,
      limit,
      totalProducts,
      totalPages,
      nextPage,
      previousPage
    };

    return this;
  }

}

module.exports = APIFeatures;




/* // مثال على كيفية استخدام APIFeatures في route
 const features = new APIFeatures(
    Product.find(), // استبدل Product بنموذجك
    req.query
  )
    .filter()
    .search()
    .sort()
    .paginate();

  const products = await features.query;

  res.status(200).json({
    status: "success",
    pagination: features.pagination,
  results: products.length,
    data: products
  });
}); */