const db = require("../models");
const User = db.users;
const Otp = db.otp;
const bcrypt = require('bcrypt')
const _ = require('lodash')
const otpGenerator = require('otp-generator')

module.exports.generateOtp = async (req, res)=> {
    // console.log(req.body)
    const {phoneNumber} = req.body
    // console.log(phoneNumber)
    const user = await User.findAll({ 
        // include:Otp, 
        where: {
        phoneNumber
    } })

    console.log(user)
    //generate the otp
    const OTP = otpGenerator.generate(4, {
        digits       : true,
        alphabets    : false,
        upperCase    : false, 
        specialChars : false
    });

    // const phoneNumber = req.body.phoneNumber;
    console.log(OTP);
    const otp = new User({
        phoneNumber, 
        otp: OTP,
        otpExp:"Expires in ..."
    });

    //now salt the otp
    const salt = await bcrypt.genSalt(10)
    otp.otp = await bcrypt.hash(otp.otp, salt)
    //save into database
    const result = await otp.save();
    
    return res.status(200).send(`otp send successfully!, And the OTP is ${OTP}` )

}

module.exports.verifyOtp = async (req, res)=> {
    // const prodId = req.params.user_id;
    // console.log(prodId);
    const {phoneNumber} = req.body
    
    const otpHolder = await Otp.findAll({  
      where: {
        phoneNumber   
    } })
    //if database havent any otp
    
    if(otpHolder.length === 0) {
    return res.status(400).send("Your used in expired otp");
}

    //now one user can req more time send the otp
    //so thats y we find multiple otp as bases on phoneNumber
    //but we have to check last otp

    const rightOtpFind = otpHolder[otpHolder.length - 1] //it catchs the last object an array 
    //now compare it with our database otp
    const validUser = await bcrypt.compare(req.body.otp, rightOtpFind.otp);

    //now we have to chk phoneNumbers as will as valid user
    if(rightOtpFind.phoneNumber === req.body.phoneNumber && validUser) {
        //here we only pick a phoneNumber
        const user = new User(_.pick(req.body, ['phoneNumber']));
        
        // const token = user.generateJWT();
        const result =  await user.save()
        
        return res.status(200).send({
            message: "Now you have varified your OTP successfully",
            
        })
    }else {
        return res.status(400).send("Your OTP was wrong")
    }

}