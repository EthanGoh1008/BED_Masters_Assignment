const Forum = require("../models/forum");

async function getAllForums(req, res) {
  try {
    const forums = await Forum.getForums();
    res.json(forums);
  } catch (err) {
    console.error("Error retrieving forums:", err);
    res.status(500).json({ error: "Error retrieving forums" });
  }
}

module.exports = {
  getAllForums,
};
