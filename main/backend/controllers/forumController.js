const Forum = require("../models/modelForum");

exports.getAllForums = async (req, res) => {
  try {
    const forums = await Forum.getForums();
    res.json(forums);
  } catch (error) {
    console.error("Error retrieving forums:", error.message);
    res.status(500).send("Server error");
  }
};

exports.createForum = async (req, res) => {
  const { title, description, image_url } = req.body;
  try {
    const newForumId = await Forum.createForum({
      title,
      description,
      image_url,
    });
    res.status(201).json({ id: newForumId, title, description, image_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating forum" });
  }
};

exports.updateForum = async (req, res) => {
  const forumId = req.params.id;
  const { title, description, image_url } = req.body;
  try {
    const success = await Forum.updateForum(forumId, {
      title,
      description,
      image_url,
    });
    if (!success) {
      return res.status(404).json({ error: "Forum not found" });
    }
    res.json({ id: forumId, title, description, image_url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating forum" });
  }
};

exports.deleteForum = async (req, res) => {
  const forumId = req.params.id;
  try {
    const success = await Forum.deleteForum(forumId);
    if (!success) {
      return res.status(404).json({ error: "Forum not found" });
    }
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error deleting forum" });
  }
};
