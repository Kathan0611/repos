const jwt = require("jsonwebtoken");
const User = require('./../models/User');
const bcrypt = require("bcrypt");


exports.signup = async (req, res) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {

          return res.status(400).json({message:"please fill required filed"})
    }

    else{

        const saltRounds=10;
        const salt= bcrypt.genSaltSync(saltRounds)
        const hashPassword = bcrypt.hashSync(password, salt);

         const existUser = await User.findOne({email:email});
         
         if(existUser){
           return res.status(400).json({message:'User alreday exist'})
         }


        const newUser = new User({
        name: name,
        email: email,
        password: hashPassword,
        });

       await newUser.save();

      return res.status(201).json({
        error:false,
        status: 201,
        message: "Signup Successfully",
        data: {
          user: newUser
        },
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {

    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ message: "please fill required filed" });
    }
    else{

      const existUser = await User.findOne({
        $or: [{ email: username }, { name: username }],
      });

      if (!existUser) {

        return res.status(400).json({ message: "document is not found" });
      } 
      else {
        
        const token = jwt.sign({id:existUser.id}, process.env.SECRET_KEY,{expiresIn:'1d'});

        if (!token) {

          return res.status(400).json({ message: "Unauthroized User" });
        } 
        
            return res.status(200).json({
              error:false,
              status: 200,
              message: "Successfully Loggding",
              data: {
                token: token,
                user: existUser,
              },
            });
          }
        }
  } 
  catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// exports.forgotPassword = async (req, res, next) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email: email });

//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "Please provide a valid email address" });
//     }

//     let otp = Math.floor(1000 + Math.random() * 9000);
   
//     await User.findOneAndUpdate(
//       { email: email },
//       { $set: { otp: otp, otpExpiration: Date.now() + 1*60*1000 } },
//       { upsert: true, new: true }
//     );

//     await sendOtpMail(otp);
//     res.status(200).json({ message: "OTP sent successfully" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { otp, newpassword } = req.body;

//     if (!otp || !newpassword) {
//       res.status(204).json({ message: "Data is not Found" });
//     }

//     const user = await User.findOne({ otp: otp });
//     console.log(user);
//     if (!user || user.otpExpiration < Date.now()) {
//       return res.status(400).json("Invalid OTP");
//     }
       
//      const saltRounds = 10;
//      const salt = bcrypt.genSaltSync(saltRounds);
//      const hashPassword = bcrypt.hashSync(password, salt);

//     user.password = hashPassword;
//     user.otp = null;
//     user.otpExpiration = null;
//     await user.save();

//     return res.json({
//       data: "Password reset successful",
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


// const nodemailer = require("nodemailer");


// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "adalajakathan06@gmail.com",
//     pass: "xmck kvgv unsz vccw",
//   },
// });


// exports.sendOtpMail = async (otp) => {
//   try {
//     const mailOptions = {
//       form: "adalajakathan06@gmail.com",
//       to: "adalajaketan7@gmail.com",
//       subject: "Password reset OTP",
//       text: `Your OTP (It is expired after 2 min) : ${otp}`,
//     };

//     transporter.sendMail(mailOptions, (error, info) => {
//       if (error) {
//         console.log("Error", error);
//       } else {
//         console.log("Success", info.response);
//       }
//     });
//   } catch (err) {
//     throw err;
//   }
// };



