const Forum = require("../models/modelForum");

async function getAllForums(req, res) {
  try {
    const forums = await Forum.getForums();
    res.json(forums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error retrieving forums" });
  }
}

async function createForum(req, res) {
  const { title, description } = req.body;
  try {
    const newForumId = await Forum.createForum({ title, description });
    res.status(201).json({ id: newForumId, title, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating forum" });
  }
}

async function updateForum(req, res) {
  const forumId = req.params.id;
  const { title, description } = req.body;
  try {
    const success = await Forum.updateForum(forumId, { title, description });
    if (!success) {
      return res.status(404).json({ error: "Forum not found" });
    }
    res.json({ id: forumId, title, description });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating forum" });
  }
}

async function deleteForum(req, res) {
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
}

module.exports = {
  getAllForums,
  createForum,
  updateForum,
  deleteForum,
};
