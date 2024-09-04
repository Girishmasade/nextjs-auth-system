import nodemailer from "nodemailer";
import bcryptjs from 'bcryptjs'
import User from "@/models/userModel";

export const sendEmail = async ({ email, emailType, userId }:any) => {
  try {

    const hashedToken = await bcryptjs.hash(userId.toString(), 10)

    if (emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId, {
          verifyToken:hashedToken, 
          verifyTokenExpiry: Date.now() + 3600000
        })
    } else if (emailType === "RESET"){
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken:hashedToken, 
        forgotPasswordExpiry: Date.now() + 3600000
      })
    }


    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "72eecadf37a640",
        pass: "3cfbdfaf6777f9"
      }
    });

    const mailOptions = {
      from: 'test@getMaxListeners.com', 
      to: email,
      subject: emailType === "VERIFY" ? "Please verify your email" : "Rest your password", // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, // html body
    };

    const mailResponse = transporter.sendMail(mailOptions)
    return mailResponse

  } catch (error) {
    console.log("Mail Response get currupted", error);
    
  }
};
