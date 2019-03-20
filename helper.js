const dotenv = require("dotenv").config({path: __dirname + "/.env"});
const fs = require("fs");
const nodemailer = require("nodemailer");
const MailError = require("./mailerror");

module.exports = sendMail = html => {
    return new Promise(async (resolve, reject) => {
        const MAILHOST = dotenv.parsed.MAILHOST;
        const MAILUSER = dotenv.parsed.MAILUSER;
        const MAILPW = dotenv.parsed.MAILPW;
        const MAILPORT = dotenv.parsed.MAILPORT;
        const MAILRECEIVER = dotenv.parsed.MAILRECEIVER;
        try {
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
