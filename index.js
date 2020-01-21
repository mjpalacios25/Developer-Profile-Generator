const fs = require('fs');
const util = require("util");
const inquire = require('inquire');
const axios = require('axios');
const convertFactory = require('electron-html-to');

function promptUser() {
    return inquirer.prompt([
      {
        type: "input",
        name: "gitName",
        message: "What is your Git Hub username?"
      },
      {
        type: "input",
        name: "favColor",
        message: "What is your favorite color?"
      },
    ]);
  }


