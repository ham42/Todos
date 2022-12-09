const express = require('express');
const { createTask, getTasks, deleteTask, updateTask, getAllTasks } = require('../controllers/taskController');
const { isAuthenticatedUser, authorizedRoles } = require('../middlewares/auth');
const router = express.Router();

router.route('/create').post(isAuthenticatedUser, createTask);
router.route('/me').get(isAuthenticatedUser, getTasks);
router.route('/update/:id').put(isAuthenticatedUser, updateTask);
router.route('/delete/:id').delete(isAuthenticatedUser, deleteTask);


module.exports = router;