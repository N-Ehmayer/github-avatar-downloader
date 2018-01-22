var request = require('request');
var secrets = require('./secrets.js');

console.log('Welcome to the Github Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + "contributors/",
    headers: {
      'User-Agent': 'request'

      // Authorization Token here???
    }
  };

  request(options, function(err, res, body) {
    cb(err, body);
  });
}
// getRepoContributors("jquery", "jquery", function(err, result) {
//   console.log('Errors: ', err);
//   console.log('Result: ', result);
// });