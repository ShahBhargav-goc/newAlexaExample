module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'skill' );
var _ = require('lodash');
var request = require('sync-request');
var ENDPOINT = 'https://cs77.salesforce.com/services/apexrest/api/job/alexaController?Date=';


app.launch( function( request, response ) {
	response.say( 'Welcome to Target recruit skills.' ).reprompt( 'Way to go. You got it to run.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('urvish',
  {
	"slots":[{"date":"AMAZON.DATE"},
			 {"sObject":"sObject"}]
	,"utterances":[ 
		"what are {date} open {sObject}"]
  },
  function(request,response) {
    var date = request.slot('date');
    //response.say("You asked for the number " + jobnumber);

    if (_.isEmpty(date)) {
      	var prompt = 'I didn\'t hear a Date. Tell me a Date.';
      	response.say(prompt).reprompt(reprompt).shouldEndSession(false);
      	return true;
    } else {
    	try{
			var request = require('sync-request');
			var res = request('GET', ENDPOINT + date ,{
				timeout:3000
			});
			
			var s = JSON.parse(res.getBody());
			console.log(s);
			response.say(s);
		}catch(e){
			console.log(e.message);
			response.say('Sorry, Some error occured ');
		}
      	return true;

	}
    	

  }
);

module.exports = app;