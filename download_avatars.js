var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request'
    }
  };



  request(options, function(err, res, body) {
    var parsedBody = JSON.parse(body);
    cb(err, parsedBody);

    parsedBody.forEach(function(user) {
      console.log(user.avatar_url);
    });
  });
}

//getRepoContributors('jquery', 'jquery', function(err, result) {});

function downloadImageByURL(url, filePath) {
  request.get(url)
    .on('error', function(error) {
      throw err;
    })
    .on('response', function(response) {
      console.log("Response Status Code: ", response.statusCode);
      console.log('Download complete.');
    })
    .pipe(fs.createWriteStream(filePath));
    console.log("Downloading images...");
}

downloadImageByURL("https://avatars0.githubusercontent.com/u/1615?v=4", 'avatars/avatar.png');
