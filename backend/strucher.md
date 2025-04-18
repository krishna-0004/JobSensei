backend/
├── app.mjs
├── server.mjs
├── .env
│
├── models/
│   └── User.mjs
│
├── routes/
│   ├── auth.mjs
│   └── user.mjs              ✅ Includes /upload-avatar route
│
├── controllers/
│   ├── authController.mjs
│   └── userController.mjs    ✅ Has uploadAvatar controller
│
├── config/
│   ├── passport.mjs
│   └── cloudinaryConfig.mjs  ✅ Cloudinary setup here
│
├── middleware/
│   ├── jwt.mjs
│   └── upload.mjs            ✅ Multer + Cloudinary storage setup
