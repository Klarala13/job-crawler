"use strict";
//const mongoose = require("mongoose");
const request = require("request");
const cron = require("node-cron");
const Logger = require("./logger");
const util = require("util");
const promisifiedRequest = util.promisify(request);
const cheerio = require("cheerio");
const helper = require("./helper");
//Hello World
const work  = async () => {
  const list = [
    {
      url: 'https://remoteok.io/remote-dev-jobs', 
      selector: ".position .preventLink h2"
    },
    {
      link: 'https://www.stepstone.de/jobs', 
      selector: ".jsForce .job-element__body__company .job-element__url--shortened-title"
    },
    {
      link: 'https://www.glassdoor.de/Job/berlin-jobs-SRCH_IL.0,6_IC2622109.htm', 
      selector: ".jobTitle .jobLink"
    },
    {
      link: 'https://www.monster.de/jobs/suche/?where=Berlin', 
      selector: '.title a'
    }
  ]
  const terms = [
    'software developer',
    'software entwickler',
    'junior developer',
    'intern',
    'internship'
  ]
   console.time("TimeConsumed");
   let promises = [];

   try {
    for (let site of list) {
      promises.push(promisifiedRequest(site.link));
    }
    const responses = await Promise.all(promises);
    const jobs = [];
    for (let i = 0; i < responses.length; i++) {
      const $ = cheerio.load(responses[i].body);
      if($(list[i].selector).length > 0){    
          $(list[i].selector).each(function(i, elem){
            for (let term of terms){
              if(
                $(this)
                .text()
                .toLowerCase()
                .indexOf(term.toLowerCase()) !== -1
              ){
                jobs.push($(this).text());
              }
            }
          });
      } else {
        throw new Error("Sorry, aint got now jobs 4u")
    }
  }
    console.log('Found jobs: ', jobs);
    const mailResponse = await helper(jobs.join());

    console.timeEnd("TimeConsumed");
    Logger(`Successfully send  with id: ${mailResponse.messageId}`)
  } catch (error) {
    throw new Error(error)
  }
};
cron.schedule('30 2 * * *', () => {
  console.log('running a task every day at 2:30am');
  work()
})
