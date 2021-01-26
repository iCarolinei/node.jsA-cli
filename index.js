#!/usr/bin/env node

if(process.argv.length < 3) //if the process parameter array length is less than 3, the country has not been entered by the user
{
    console.log ('Missing input : Country')
    return
}

const { getCode, getName } = require('country-list');
const axios = require('axios');
const ora = require('ora');

const spinner = ora('Treating your request. All our employees are working very hard !').start();
const chalk = require('chalk');

let countryInput = process.argv[2]; // get third parameter (1=node 2=holidays 3=countryInput)

let countryCode = getCode(countryInput); //Get code of the country that the use has input
if(!countryCode) //If countryCode is undefined
{
    console.log (''.concat('Invalid country : ',countryInput));
    return
} 
let currentyear = new Date().getFullYear();
if(process.argv.length >= 4) 
{
  let yearInput = process.argv[3];
  if(isNumeric(yearInput))
  currentyear = yearInput;
}

let request = 'https://date.nager.at/api/v2/publicholidays/'.concat(currentyear,'/',countryCode)
axios.get(request)
    .then(DisplayResults)
  .catch(function (error) {
    console.log(error);
    spinner.fail("It's such a shame to have these employees :(");
  })
  .then(function () {
    // always executed
  });
  

  function DisplayResults(response)
  {
    spinner.succeed("We are very proud of our employees ! They have done it quite fast :p");
    let holidays = response.data;
    holidays.forEach(holiday => console.log(chalk.rgb(123, 45, 67)(holiday.date).concat(chalk.white(' ', holiday.name.trim()))));
   
  }
  
  function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
  }


