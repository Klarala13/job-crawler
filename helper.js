console.log({ path: __dirname + "/.env" })
require("dotenv").config({ path: __dirname + "/.env" });
const fs = require("fs");
const nodemailer = require("nodemailer");
const MailError = require("./mailerror");

module.exports = sendMail = html => {
  return new Promise(async (resolve, reject) =>{
    console.log(this)
    const MAILHOST = process.env.MAILHOST;
    const MAILUSER = process.env.MAILUSER;
    const MAILPW = proccess.env.MAILPW;
    const MAILPORT = proccess.env.MAILPORT;
    const MAILRECEIVER = process.env.MAILRECEIVER;
    try{
      let transporter = nodemailer.createTransport({
        host: MAILHOST,
        port: MAILPORT,
        auth: {
          user: MAILUSER,
          pass: MAILPW
        }
      });
      let mailOptions = {
        from: "jobcrawler@cron.io",
        to: MAILRECEIVER,
        subject: `Message with some nice Jobs 4 u`,
        text: html,
        html: html
      };
      const info = await transporter.sendMail(mailOptions);
      resolve(info);
      console.log("Email Sent", info.messageId);
    } catch (error) {
      throw new MailError(error);
    }
  });
};
