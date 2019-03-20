"use strict"
const fs = require("fs");
const util = require("util");

function Logger(message) {
  const stream = fs.createWriteStream("cron.log", {
    flags: "a" 
    //WTF Flags?!??!
  });
  stream.write(util.format(`JobCron ${new Date().toISOString()} ${message}\n`))
}

module.exports = Logger;
