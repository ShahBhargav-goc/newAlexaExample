module.change_code = 1;
'use strict';

var alexa = require( 'alexa-app' );
var app = new alexa.app( 'skill' );
var _ = require('lodash');
var request = require('sync-request');
var ENDPOINT = 'https://partial2-atlasmedstaff.cs77.force.com/services/apexrest/api/job/alexaController';


app.launch( function( request, response ) {
	response.say( 'Welcome to Target recruit skills.' ).reprompt( 'Way to go. You got it to run.' ).shouldEndSession( false );
} );


app.error = function( exception, request, response ) {
	console.log(exception)
	console.log(request);
	console.log(response);	
	response.say( 'Sorry an error occured ' + error.message);
};

app.intent('sObject',
  {
	"slots":{"date":"AMAZON.DATE",
			 "toObject":"toObject",
			 "hotJob":"hotJob",
			 "picklistValue":"picklistValue",
		     "fieldName":"fieldName"}
	,"utterances":[ 
		"what are {date} open {toObject}"]
  },
  function(request,response) {
	var date = request.slot('date');
	var toObject = request.slot('toObject');
	var hotJob  = request.slot('hotJob');
	var picklistValue  = request.slot('picklistValue');
	var fieldName  = request.slot('fieldName');
    //response.say("You asked for the number " + jobnumber);

    // if (_.isEmpty(date)) {
    //   	var prompt = 'I didn\'t hear a Date. Tell me a Date.';
    //   	response.say(prompt).reprompt(reprompt).shouldEndSession(false);
    //   	return true;
    // } else if(_.isEmpty(toObject)) {
	// 	var prompt = 'I didn\'t hear a Object. Tell me a Object.';
    //   	response.say(prompt).reprompt(reprompt).shouldEndSession(false);
    //   	return true;
	// } else 
	if(!_.isEmpty(date) && !_.isEmpty(toObject) && _.isEmpty(hotJob) && _.isEmpty(picklistValue) && _.isEmpty(fieldName)) {
    	try{
			var request = require('sync-request');
			var res = request('GET', ENDPOINT +'?Date='+date+'&toObject='+toObject,{
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

	}else if(!_.isEmpty(hotJob) && !_.isEmpty(toObject) && _.isEmpty(date) && _.isEmpty(picklistValue) && _.isEmpty(fieldName)) {
		try{
			var request = require('sync-request');
			var res = request('GET', ENDPOINT +'?hotJob='+hotJob+'&toObject='+toObject,{
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