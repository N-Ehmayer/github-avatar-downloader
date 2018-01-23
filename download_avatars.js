//--Imports required packages--
var request = require('request');
var secrets = require('./secrets.js');
var fs = require('fs');

//--Gathers repo owner and name from user--
args = process.argv.slice(2);

console.log('Welcome to the Github Avatar Downloader!');

//--Grabs contributor data from Github API--
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


//--Checks if user input is valid and downloads avatars to local folder if true--
if (args.length === 2) {
  getRepoContributors(args[0], args[1], function(err, result) {
    var parsedBody = JSON.parse(result);
    parsedBody.forEach(function(user) {
      var url = user.avatar_url;
      var path = 'avatars/' + user.login + '.png';
      downloadImageByURL(url, path);
    });
  });
} else {
  console.log("Not a valid repo owner/name.");
}



