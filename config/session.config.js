const session = require("express-session"); //  npm package to generate sessions in Express
const MongoStore = require("connect-mongo"); // npm package to store session data inside our database
const mongoose = require("mongoose"); // Handle MONGODB

//Exports the info from the session and cookies to we have
// data persistence between the different HTTP requests.
module.exports = (app) => {
  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === " production" ? "none" : "lax",
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 60000 * 60, // 1 hour
      },
    })
  );
};
