const express = require("express");
const router = express.Router();
const forumController = require("../controllers/forumController");
const validateForum = require("../middlewares/validateForum");

router.get("/", forumController.getAllForums);
router.post("/", validateForum, forumController.createForum);
router.put("/:id", validateForum, forumController.updateForum);
router.delete("/:id", forumController.deleteForum);

module.exports = router;
