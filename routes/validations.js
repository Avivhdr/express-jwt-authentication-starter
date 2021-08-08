const Joi = require('joi');

const validatePostDetails = (data) => {
  const schema = Joi
    .object({
      username: Joi
        .alphanum()
        .min(3)
        .max(256)
        .required(),
      password: Joi
        .alphanum()
        .min(6)
        .required(),
      // email: Joi
      //   .string()
      //   .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })

    })
    // .with('password', 'repeat_password');

  return schema.validate(data);
};

module.exports = {
  validatePostDetails,
};
