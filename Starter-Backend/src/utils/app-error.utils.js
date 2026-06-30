// utils/app-error.utils.js use for creating custom error classes for your application. This can help you handle errors more effectively and provide more meaningful error messages to users or developers.
// this is not used
class AppError extends Error{
    constructor(message,statusCode){
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4')? 'fail':'error';
    this.isOperational = true;
    Error.captureStackTrace(this,this.constructor)
    }
}

module.exports = AppError;

// Example usage:
//  return next(new AppError("User not found", 404));