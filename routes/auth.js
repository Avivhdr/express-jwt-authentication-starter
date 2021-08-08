const passport = require('passport');
const router = require('express').Router();

router.get("/facebook", passport.authenticate("facebook"));
router.get("/facebook/callback",
  passport.authenticate("facebook"),
  (req, res) => {
    res.redirect("../../profile");
  });

router.get("/amazon", passport.authenticate("amazon", { scope: ["profile"] }));
router.get("/amazon/callback",
  passport.authenticate("amazon"),
  (req, res) => {
    res.redirect("../../profile");
  });

router.get("/github", passport.authenticate("github"));
router.get("/github/callback",
  passport.authenticate("github"),
  (req, res) => {
    res.redirect("../../profile");
  });

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback",
  passport.authenticate("google"),
  (req, res) => {
    res.redirect("../../profile");
  });

router.get("/instagram", passport.authenticate("instagram"));
router.get("/instagram/callback",
  passport.authenticate("instagram"),
  (req, res) => {
    res.redirect("../../profile");
  });

router.get("/spotify", passport.authenticate("spotify"));
router.get("/spotify/callback",
  passport.authenticate("spotify"),
  (req, res) => {
    
    res.redirect("../../profile");
  });

router.get("/twitch", passport.authenticate("twitch.js"));
router.get("/twitch/callback",
  passport.authenticate("twitch.js"),
  (req, res) => {
    res.redirect("../../profile");
  });

module.exports = router;
