const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");

// Define the route for getting all forums
router.get("/", forumController.getAllForums);
router.post("/", forumController.createForum);
router.put("/:id", forumController.updateForum);
router.delete("/:id", forumController.deleteForum);

// Export the router
module.exports = router;
