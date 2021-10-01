module.exports = (sequelize, Sequelize) => {
    const Otp = sequelize.define("Otp",{
        phoneNumber: {
            //type:String,
            type: Sequelize.STRING,
            required: true
        },
        otp: {
            type: Sequelize.STRING,
            required: true
        },
        // user_id: {
        //     type: Sequelize.INTEGER,
        //     required: true
        // },
        createdAt: {
            type: Sequelize.DATE,
            dafault:Date.now,
            index: {expires: 300}
        }
    
        //it means after 5 mins it deleted auto from the database
    
    }, {timestamps: true})
  
    return Otp;
  };