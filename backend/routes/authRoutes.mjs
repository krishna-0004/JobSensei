import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: `${process.env.CLIENT_URL}/dashboard`
  })
);

// LinkedIn
router.get('/linkedin', passport.authenticate('linkedin'));
router.get('/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: process.env.FRONTEND_URL + '/dashboard',
    failureRedirect: process.env.FRONTEND_URL + '/login'
  })
);

// GitHub
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback',
  passport.authenticate('github', {
    successRedirect: process.env.FRONTEND_URL + '/dashboard',
    failureRedirect: process.env.FRONTEND_URL + '/login'
  })
);

router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect(process.env.CLIENT_URL);
  });
});

router.get('/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});

export default router;
