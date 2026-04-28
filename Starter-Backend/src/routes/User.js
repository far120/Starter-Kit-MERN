const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middlewares/validate');
const { ValidateCreateUserSchema, ValidateUpdateMeSchema, ValidateUserlogin, ValidateResetPassword } = require('../validators/userValidator');
const authorize = require('../middlewares/authorize.middleware');
const authandicate = require('../middlewares/authenticate.middleware');
// const paginate = require('../middlewares/paginate.middleware');
const User = require('../models/User');
const upload = require('../middlewares/uploadMiddleware');


/**
 * @desc    add a new user
 * @route   POST /api/users
 * @method  POST
 * @access  Public
 */
router.post("/", upload.single('image'), validate(ValidateCreateUserSchema), userController.CreateUser);

/**
 * @desc    Login user
 * @route   POST /api/users/login
 * @method  POST
 * @access  Public
 */
router.post("/login", validate(ValidateUserlogin), userController.LoginUser);


/**
 * @desc    Logout user
 * @route   POST /api/users/logout
 * @method  POST
 * @access  Public
 */
router.post("/logout", authorize(['admin']), userController.LogoutUser);


/**
 * @desc    get all users
 * @route   GET /api/users
 * @method  GET
 * @access  private (admin)
 */
router.get("/", authorize(['admin']),  userController.GetUsers);

/**
 * @desc    get me
 * @route   GET /api/users/me
 * @method  GET
 * @access  private (me)
 */
router.get("/me", authandicate, userController.GetMe);

/**
 * @desc    update me
 * @route   PUT /api/users/me
 * @method  PUT
 * @access  private (me)
 */
router.put("/me", authandicate, upload.single('image'), validate(ValidateUpdateMeSchema), userController.UpdateMe);

/**
 * @desc    reset my password
 * @route   PUT /api/users/me/reset-password
 * @method  PUT
 * @access  private (me)
 */
router.put("/me/reset-password", authandicate, validate(ValidateResetPassword), userController.ResetMyPassword);

/**
 * @desc    delete user
 * @route   DELETE /api/users/delete/:userId
 * @method  DELETE
 * @access  private (admin)
 */
router.delete("/delete/:userId", authorize(['admin']), userController.DeleteUser);



/**
 * @desc    change user role
 * @route   PUT /api/users/:userId/role
 * @method  patch
 * @access  private (admin)
 */
router.patch("/:userId/role", authorize(['admin']), userController.ChangeUserRole);


/**
 * @desc   activate user
 * @route   PATCH /api/users/activate/:userId
 * @method  PATCH
 * @access  private (admin)
 */
router.patch("/activate/:userId", authorize(['admin']), userController.ActivateUser);



module.exports = router;