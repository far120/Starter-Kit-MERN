const UserLog = require('../models/UserLogs');
const asynchandler = require('express-async-handler');
const logger = require('../utils/logger');
const { filter } = require('compression');
const user = require('../models/User');
const paginate = require('../utils/paginate');


/** * @desc    get all userslogs
 * @route   GET /api/userslogs
 * @method  GET
 * @access  private (admin)
 * */
exports.GetUserLogs = asynchandler(async (req, res) => {
    logger.info(`Retrieving all user logs by admin: ${req.user.id}`);
    // const userLogs = await UserLog.find();
    // res.status(200).json(userLogs);

    // i want make clear automatic to the userlog after 1 day and i will make it in the model with TTL index and i will make a cron job to delete the expired logs
    await UserLog.deleteMany({ createdAt: { $lt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) } });

    // with pagination and filtering and sorting and selecting
    const filter = {};
    if (req.query.email) filter.email = { $regex: req.query.email, $options: "i" };
   const result = await paginate({
    model: UserLog,
    page: req.query.page,
    limit: req.query.limit,
    filter,
    sort: req.query.sort,
    populate: req.query.populate,
    select: req.query.select

    });
    res.json(result);

});





