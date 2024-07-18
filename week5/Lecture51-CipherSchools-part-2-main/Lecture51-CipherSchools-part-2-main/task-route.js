const express = require("express");
const { authMiddleware } = require("../middleware/auth-middleware");
const router =  express.Router();
const taskContoller = require("../controllers/task-controller");

router.get("/self", authMiddleware, taskContoller.getTasksForUser);

module.exports = router;