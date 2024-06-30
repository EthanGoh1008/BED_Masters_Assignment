const Joi = require("joi");

const validateForum = (req, res, next) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(50).required(),
    description: Joi.string().max(255).required(),
    image_url: Joi.string().uri().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details.map((e) => e.message) });
  }

  next();
};

module.exports = validateForum;
