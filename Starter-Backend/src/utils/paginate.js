// this code defines a utility function called `paginate` that helps in paginating results from a MongoDB collection using Mongoose. It takes an object as an argument with the following properties:
// - `model`: The Mongoose model to query.
// - `page`: The current page number (default is 1).
// - `limit`: The number of documents to include per page (default is 10).
// - `filter`: The filter criteria for the query (default is an empty object).
// - `sort`: The sorting criteria for the query (default is sorted by `createdAt` in descending order).
// - `populate`: The field(s) to populate in the query results (default is an empty string).
// - `select`: The fields to include in the query results (default is an empty string).

const paginate = async ({
  model,
  page = 1,
  limit = 10,
  filter = {},
  sort = { createdAt: -1 },
  populate = "",
  select = "",
}) => {

 console.log({
    model: model.modelName,
    page,
    limit,
    filter,
    sort,
    populate,
    select,
  });

  // Convert query params to numbers
  page = Number(page);
  limit = Number(limit);

  // Validation
  if (page < 1) page = 1;
  if (limit < 1) limit = 10;

  const skip = (page - 1) * limit;

  // Count documents
  const totalDocuments = await model.countDocuments(filter);

  // Build query
  let query = model
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  // Optional populate
  if (populate) {
    query = query.populate(populate);
  }

  // Optional select
  if (select) {
    query = query.select(select);
  }

  // Execute query
  const data = await query;

  return {
    data,
    pagination: {
      page,
      limit,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      hasNextPage: page < Math.ceil(totalDocuments / limit),
      hasPrevPage: page > 1,
    },
  };
};

module.exports = paginate;



// // example usage
// const result = await paginate({
//   model: Product,
//   page: req.query.page,
//   limit: req.query.limit,

//   filter: {
//     category: req.query.category,
//     inStock: true,
//   },

//   sort: {
//     price: -1,
//   },

//   populate: "category",

//   select: "name price category",
// });