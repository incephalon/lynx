
// API Key: zwaf7zgfbbssngwxmuh8f7h9
// Shared Secret: JCdPsbYWNG  

// Tv Listing : repr3gqn6ngdwpcms4rgvvrt 

var request = require('request');

var rovicorp = {};

module.exports = rovicorp;

rovicorp.apiCall = function(){
	request('http://api.rovicorp.com/TVlistings/v9/listings/services/postalcode/63006/info?locale=en-US&countrycode=US&format=json&apikey=repr3gqn6ngdwpcms4rgvvrt', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			// console.log(body) // Print the google web page.
		}
		else{
			// console.log(error);
			// console.log(body);
		}
	})	
}

rovicorp.apiCall();