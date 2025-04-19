backend/
├── app.mjs
├── server.mjs
├── .env
│
├── models/
│   ├── User.mjs               # Existing User schema (includes recruiter jobs)
│   └── Job.mjs                ✅ New: Job model (for dedicated job collection)
│
├── routes/
│   ├── auth.mjs
│   ├── user.mjs               # User-related routes
│   └── job.mjs                ✅ New: Routes for job fetching/filtering
│
├── controllers/
│   ├── authController.mjs
│   ├── userController.mjs
│   └── jobController.mjs      ✅ New: Logic for fetching jobs from both collections
│
├── config/
│   ├── passport.mjs
│   └── cloudinaryConfig.mjs
│
├── middleware/
│   ├── jwt.mjs
│   └── upload.mjs
