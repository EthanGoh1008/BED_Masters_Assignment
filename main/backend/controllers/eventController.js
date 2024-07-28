const Event = require("../models/modelEvent");

exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.getEvents();
    res.json(events);
  } catch (error) {
    console.error("Error retrieving events:", error.message);
    res
      .status(500)
      .send(
        "There was an error retrieving the events. Please try again later."
      );
  }
};

exports.createEvent = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newEventId = await Event.createEvent({ title, description });
    res.status(201).json({ id: newEventId, title, description });
  } catch (error) {
    console.error("Error creating event:", error.message);
    res
      .status(500)
      .json({
        error: "There was an error creating the event. Please try again later.",
      });
  }
};
