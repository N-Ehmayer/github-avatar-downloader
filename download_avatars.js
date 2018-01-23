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
    cb(err, body);
  });
}


getRepoContributors('jquery', 'jquery', function(err, result) {
  var parsedBody = JSON.parse(result);
  parsedBody.forEach(function(user) {
    var url = user.avatar_url;
    var path = 'avatars/' + user.login + '.png';
    downloadImageByURL(url, path);
  });
});

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

