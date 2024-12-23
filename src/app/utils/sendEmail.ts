import nodemailer from 'nodemailer'
import config from '../config';
export const sendEmail=async(to:string,html:string)=>{


    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: config.node_env==="production", // true for port 465, false for other ports
        auth: {
            user: "kazifahim661@gmail.com",
            pass: "kupr pwtk tnxt trju",
        },
    });
    await transporter.sendMail({
        from: 'kazifahim661@gmail.com', // sender address
        to,
        subject: "Change your passWord withIn 10", // Subject line
        text: "PH_university", // plain text body
        html 
    });


}