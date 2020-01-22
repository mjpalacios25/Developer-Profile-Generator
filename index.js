const fs = require('fs');
const util = require("util");
const inquirer = require('inquirer');
const axios = require('axios');
// const electronPDF = require('electron-pdf');

// const writeFileAsync = util.promisify(fs.writeFile);

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
  };

  function generateHTML(answers) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      <script src="https://kit.fontawesome.com/f674c96901.js" crossorigin="anonymous"></script>
      <title>Document</title>
    </head>
    <body>
      <div class="jumbotron">
          <div class="container rounded">
              <img src="" alt="">
              <h1 class="display-4 text-center">Hi! My name is ${answers.name}</h1>
              <p class="lead text-center">I am from ${answers.location}.</p>
              <h3 class="text-center">Currently at ${answers.place}</h3>
              <a class="text-center" href=""><h4><i class="fas fa-location-arrow"></i> Where I am</h4></a>
              <a class="text-center" href=""><h4><i class="fab fa-github"></i> ${answers.github}</h4></a>
              <a class="text-center" href=""><h4><i class="fas fa-blog"></i> ${answers.blog}</h4></a>
              <h3 class="text-center">My GitHub username is </h3>
              <h3 class="text-center">Currently at ${answers.place}</h3>
          </div>
    </div>
    <h4 class="text-center">${answers.bio}</h4>
    <div class="container">
      <div class="row mx-md-n5 my-4">
          <div class="col px-md-5 text-center"><div class="p-3 border bg-light">Custom column padding</div></div>
          <div class="col px-md-5 text-center"><div class="p-3 border bg-light">Custom column padding</div></div>
        </div>
        <div class="row mx-md-n5">
          <div class="col px-md-5 text-center"><div class="p-3 border bg-light">Custom column padding</div></div>
          <div class="col px-md-5 text-center"><div class="p-3 border bg-light">Custom column padding</div></div>
        </div>
  
    </div>
  
    </body>
    </html>`;
  };



promptUser().then((answers) => {

    const queryURL = `https://api.github.com/users/${answers.gitName}/repos?per_page=100`;
    axios.get(queryURL).then(function(response){
        console.log(queryURL);
        
    })
});
