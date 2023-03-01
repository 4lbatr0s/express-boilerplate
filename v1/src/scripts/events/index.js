import eventEmitter from "./eventEmitter.js"
import nodemailer from "nodemailer";

export default () => { 
    eventEmitter.on("send_email", (emailData)=>{
        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port:process.env.EMAIL_PORT,
            secure: false, // true for 465, false for other ports
            auth: {
              user: process.env.EMAIL_USER, // generated ethereal user
              pass: process.env.EMAIL_PASSWORD, // generated ethereal password
            },
        });

        let info =  transporter.sendMail({
            from: process.env.EMAIL_FROM, // sender address
            ...emailData,
        });

        console.log(info);

    })
}