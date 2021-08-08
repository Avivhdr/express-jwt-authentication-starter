const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const AmazonStrategy = require("passport-amazon").Strategy;
const GithubStrategy = require("passport-github").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const InstagramStrategy = require("passport-instagram").Strategy;
const SpotifyStrategy = require("passport-spotify").Strategy;
const TwitchStrategy = require("passport-twitch.js").Strategy;
const chalk = require("chalk");

const keys = require("./OAuthKeys");
const { updateUser } = require("../app");

module.exports = (passport) => {

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  // Facebook Strategy
  passport.use(new FacebookStrategy({
    clientID: keys.FACEBOOK.clientID,
    clientSecret: keys.FACEBOOK.clientSecret,
    callbackURL: "/auth/facebook/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate(..., function (err, user) {

        // if (err) { return done(err); }

        console.log(chalk.blue(JSON.stringify(profile)));
        // user = { ...profile };
        return done(null, profile);
      // }
    }));

  // Amazon Strategy
  passport.use(new AmazonStrategy({
    clientID: keys.AMAZON.clientID,
    clientSecret: keys.AMAZON.clientSecret,
    callbackURL: "/auth/amazon/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate(..., function (err, user) {

      //   if (err) { return done(err); }

        console.log(chalk.blue(JSON.stringify(profile)));
        // user = { ...profile };
        return done(null, profile);
      // }
    }));

  // Github Strategy
  passport.use(new GithubStrategy({
    clientID: keys.GITHUB.clientID,
    clientSecret: keys.GITHUB.clientSecret,
    callbackURL: "/auth/github/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate(..., function (err, user) {

      //   if (err) { return done(err); }

        console.log(chalk.blue(JSON.stringify(profile)));
        // user = { ...profile };
        return done(null, profile);
      // }
    }));

  // Google Strategy
  passport.use(new GoogleStrategy({
    clientID: keys.GOOGLE.clientID,
    clientSecret: keys.GOOGLE.clientSecret,
    callbackURL: "/auth/google/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate(..., function (err, user) {

      //   if (err) { return done(err); }

        console.log(chalk.blue(JSON.stringify(profile)));
        // user = { ...profile };
        return done(null, profile);
      // }
    }));

  // Instagram Strategy
  passport.use(new InstagramStrategy({
    clientID: keys.INSTAGRAM.clientID,
    clientSecret: keys.INSTAGRAM.clientSecret,
    callbackURL: "/auth/instagram/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate(..., function (err, user) {

      //   if (err) { return done(err); }

        console.log(chalk.blue(JSON.stringify(profile)));
        // user = { ...profile };
        return done(null, profile);
      // }
    }));

  // Spotify Strategy
  passport.use(new SpotifyStrategy({
    clientID: keys.SPOTIFY.clientID,
    clientSecret: keys.SPOTIFY.clientSecret,
    callbackURL: "/auth/spotify/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate(..., function (err, user) {

      // if (err) { return done(err); }

      console.log(chalk.blue(JSON.stringify(accessToken)));
      // console.log(chalk.green(JSON.stringify(refreshToken)));
      console.log(chalk.yellow(JSON.stringify(profile)));
      // }
      // updateUser({ ...profile })
      // user = { ...profile };
      return done(null, profile);
    }));

  // Twitch Strategy
  passport.use(new TwitchStrategy({
    clientID: keys.TWITCH.clientID,
    clientSecret: keys.TWITCH.clientSecret,
    callbackURL: "/auth/twitch/callback"
  },
    (accessToken, refreshToken, profile, done) => {
      // User.findOrCreate(..., function (err, user) {

      // if (err) { return done(err); }

      console.log(chalk.blue(JSON.stringify(profile)));
      // user = { ...profile };
      return done(null, profile);
      // }
    }));

}
