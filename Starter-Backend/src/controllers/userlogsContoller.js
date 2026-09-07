const UserLog = require('../models/UserLogs');
const asynchandler = require('express-async-handler');
const logger = require('../config/WistonLogger');
const { filter } = require('compression');
const user = require('../models/User');
const APIFeatures = require('../utils/api-features');

/** * @desc    get all userslogs
 * @route   GET /api/userslogs
 * @method  GET
 * @access  private (manager)
 * */
exports.GetUserLogs = asynchandler(async (req, res) => {
    logger.info(`Retrieving all user logs by manager: ${req.user.id}`);

    // i want make clear automatic to the userlog after 1 day and i will make it in the model with TTL index and i will make a cron job to delete the expired logs
    // await UserLog.deleteMany({ createdAt: { $lt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) } });
    await UserLog.deleteMany({ createdAt: { $lt: new Date(Date.now() - 1 * 60 * 1000) } });

    const features = new APIFeatures(UserLog.find(), req.query)
        .filter()
        .search()
        .sort()
        await features.paginate();

        const userlogs = await features.query;

  res.status(200).json({
    status: "success",
    pagination: features.pagination,
    results: userlogs.length,
    data: userlogs
  });
});






