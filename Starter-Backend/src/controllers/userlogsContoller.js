const UserLog = require('../models/UserLogs');
const asynchandler = require('express-async-handler');
const logger = require('../utils/logger');
const { filter } = require('compression');
const user = require('../models/User');


/** * @desc    get all userslogs
 * @route   GET /api/userslogs
 * @method  GET
 * @access  private (admin)
 * */
exports.GetUserLogs = asynchandler(async (req, res) => {
    logger.info(`Retrieving all user logs by admin: ${req.user.id}`);
    // const userLogs = await UserLog.find();
    // res.status(200).json(userLogs);

    // i want make clear automatic to the userlog after 30 days and i will make it in the model with TTL index and i will make a cron job to delete the expired logs
    await UserLog.deleteMany({ createdAt: { $lt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) } });
    // with pagination
    res.status(200).json(res.paginatedResult);
});





