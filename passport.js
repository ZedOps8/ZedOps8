//Install the passport library using npm. Implement user authentication in an Express.js application using Passport.js with a local strategy.
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const app = express();

passport.use(new LocalStrategy(
  (username, password, done) => {
    // Check username and password
    // Mock implementation
    if (username === 'user' && password === 'password') {
      return done(null, { id: 1, username: 'user' });
    } else {
      return done(null, false, { message: 'Incorrect username or password' });
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // Fetch user from the database based on id
  // Mock implementation
  const user = { id: 1, username: 'user' };
  done(null, user);
});

app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })
);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
