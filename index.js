const fs = require('fs');
const util = require("util");
const inquirer = require('inquirer');
const axios = require('axios');
const electronPDF = require('electron-pdf');

const writeFileAsync = util.promisify(fs.writeFile);

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

  function generateHTML(gitInfo, followerResponse, followingResponse, starredResponse, userInfo, mapsURL, userURL, answers) {
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
              <img src="${gitInfo.data[0].owner.avatar_url}" alt="">
              <h1 class="display-4 text-center">Hi! My name is </h1>
              <h3 class="text-center">Currently at ${userInfo.data.company}</h3>
              <a class="text-center" href="${mapsURL}"><h4><i class="fas fa-location-arrow"></i> ${userInfo.data.location}</h4></a>
              <a class="text-center" href="${userURL}"><h4><i class="fab fa-github"></i> GitHub</h4></a>
              <a class="text-center" href=""><h4><i class="fas fa-blog"></i> Blog</h4></a>
              <h3 class="text-center">My GitHub username is ${answers.gitName}</h3>
              <h3 class="text-center">Currently at ${userInfo.data.company}</h3>
          </div>
    </div>
    <h4 class="text-center">${userInfo.data.bio}</h4>
    <div class="container">
        <div class="row mx-md-n5 my-4">
            <div class="col px-md-5 text-center"><div class="p-3 border bg-light"><p>Public Repositories</p> <p>${gitInfo.data.length}</p></div></div>
            <div class="col px-md-5 text-center"><div class="p-3 border bg-light"><p>Followers</p> <p>${followerResponse.data.length}</p></div></div>
        </div>
        <div class="row mx-md-n5">
            <div class="col px-md-5 text-center"><div class="p-3 border bg-light"><p>Git Hub Stars</p> <p>${starredResponse.data.length}</p></div></div>
            <div class="col px-md-5 text-center"><div class="p-3 border bg-light"><p>Following</p> <p>${followingResponse.data.length}</p></div></div>
        </div>

  
    </div>
  
    </body>
    </html>`;
  };

async function getData(answers){
    try{
        const queryURL = `https://api.github.com/users/${answers.gitName}/repos?per_page=100`;
        const followerURL = `https://api.github.com/users/${answers.gitName}/followers`;
        const followingUrl = `https://api.github.com/users/${answers.gitName}/following`;
        const starredURL = `https://api.github.com/users/${answers.gitName}/starred`
        const profileURL = `https://api.github.com/users/${answers.gitName}`;
        const userURL = `https://github.com/${answers.gitName}`
        
    
        const gitInfo =  await axios.get(queryURL);
        const followerResponse =  await axios.get(followerURL);
        const followingResponse =  await axios.get(followingUrl);
        const starredResponse =  await axios.get(starredURL);
        const userInfo = await axios.get(profileURL)
        const mapsURL = `https://www.google.com/maps/place/${userInfo.data.location}`
        
        console.log(mapsURL);

        const html = await generateHTML(gitInfo, followerResponse, followingResponse, starredResponse, userInfo, mapsURL, userURL, answers);
        await writeFileAsync("index.html", html);
        console.log("Successfully wrote to 'index.html' file");
        
    } catch (err) {
        console.log(err);
      }
}


promptUser().then(function(answers){
    getData(answers);
}).then(function(result){
    pdfExport = new electronPDF();
    pdfExport
})