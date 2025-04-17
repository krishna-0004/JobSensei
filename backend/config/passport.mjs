import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { Strategy as GitHubStrategy } from 'passport-github2';
import dotenv from "dotenv"
import User from '../models/user.mjs';

dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) return done(null, existingUser);

        const newUser = new User({
          googleId: profile.id,
          displayName: profile.displayName,
          email: profile.emails[0].value,
          photo: profile.photos[0].value
        });

        await newUser.save();
        done(null, newUser);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.use(
  new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: `${process.env.CALLBACK_URL}/linkedin/callback`,
    scope: ['r_liteprofile', 'r_emailaddress'],
    state: true,
  },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOneAndUpdate(
        { linkedinId: profile.id },
        {
          linkedinId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          photo: profile.photos?.[0]?.value || '',
        },
        { upsert: true, new: true }
      );
      return done(null, user);
    })
);

passport.use(
  new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
  },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOneAndUpdate(
        { githubId: profile.id },
        {
          githubId: profile.id,
          displayName: profile.displayName,
          email: profile.emails?.[0]?.value || '',
          photo: profile.photos?.[0]?.value || '',
        },
        { upsert: true, new: true }
      );
      return done(null, user);
    })
);
