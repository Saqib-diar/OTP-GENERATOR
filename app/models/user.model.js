const jwt = require('jsonwebtoken')

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
      name: {
        type: Sequelize.STRING
      },
      otp: {
        type: Sequelize.STRING
      },
      phoneNumber: {
        type: Sequelize.STRING
      },
      otpExp: {
        type: Sequelize.DATE,
        dafault:Date.now,
        index: {expires: 300}

      },
    });
    User.generateJWT = function () {
      const token = jwt.sign({
          _id: this._id,
          phoneNumber: this.phoneNumber
      }, process.env.JWT_SECRET_KEY, { expiresIn: '7d' })
      return token
    }
    return User;
  };

  
