module.exports = app => {
    const users = require("../controllers/user.controller.js");
    const { generateOtp, verifyOtp } = require('../Controllers/user.otp.controller')
  
    var router = require("express").Router();
  
    // Create a new user
    router.post("/", users.create);
  
    // Retrieve all users
    // router.get("/users/generateOTP", users.findAll);
    router.route('/generateOTP')
    .post(generateOtp);


    router.route('/verify')
    .post(verifyOtp);


  
    app.use('/api/users', router);
  };