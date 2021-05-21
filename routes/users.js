const mongoose = require('mongoose');
const router = require('express').Router();
const User = mongoose.model('User');
const passport = require('passport');
const utils = require('../lib/utils');

// Register a new user
router.post('/register', function (req, res, next) {
  const { password, username } = req.body;
  const { salt, hash } = utils.generateSaltAndHash(password);

  const newUser = new User({ username, hash, salt });

  try {
    newUser.save()
      .then((user) => {
        res.json({ success: true, user });
      });
  } catch (err) {
    res.json({ success: false, msg: err });
  }

});

// Validate an existing user and issue a JWT
router.post('/login', function (req, res, next) {
  const { password, username } = req.body;

  User.findOne({ username })
    .then((user) => {

      if (!user) { // User doesn't exists
        return res.status(401).json({ success: false, msg: "could not find user" });
      }

      // Function defined at bottom of app.js
      const isValid = utils.validPassword(password, user.hash, user.salt);

      if (isValid) {
        const { token, expiresIn } = utils.issueJWT(user);
        res.cookie('jwt', token, { maxAge: 1000 * 60 * 60 * 24 })
        // res.header('set-cookie', `jwt="${token};max-age=${500 * 60 * 60 * 24};"`)

        res.status(200).json({ success: true });
        // res.status(200).json({ success: true, token, expiresIn });
      } else { // Wrong password
        res.status(401).json({ success: false, msg: "you entered the wrong password" });
      }
    })
    .catch((err) => {
      next(err);
    });
});

router.get(
  '/protected',
  passport.authenticate('jwt', { session: false }),
  (req, res, next) => {
    res.status(200).json({ success: true, msg: "You are successfully authenticated to this route!" });
  }
);

module.exports = router;
