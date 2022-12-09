const express = require('express');
const { getAllTasks, remarkTask } = require('../controllers/taskController');
const { registerUser, loginUser, logoutUser } = require('../controllers/userController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');
const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);


router.route('/admin/tasks').get(isAuthenticatedUser, authorizedRoles('admin'), getAllTasks);
router.route('/admin/task/:id').put(isAuthenticatedUser, authorizedRoles('admin'), remarkTask);

module.exports = router;