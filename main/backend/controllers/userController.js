const userModel = require("../models/userModel");

async function getUsers(req, res) {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

async function addUser(req, res) {
  try {
    const user = req.body;
    await userModel.createUser(user);
    res.status(201).send("User created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
}

module.exports = {
  getUsers,
  addUser,
};
