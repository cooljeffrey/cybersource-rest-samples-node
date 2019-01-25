'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));
var processCredit = require('./ProcessCredit');
/**
 * This is a sample code to call VoidApi,
 * Void a Credit
 * Include the credit ID in the POST request to cancel the credit.
 */
function voidACredit(callback) {

	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.VoidApi(configObject);

		var clientReferenceInformation = new cybersourceRestApi.Ptsv2paymentsClientReferenceInformation();
		clientReferenceInformation.code = 'test_credit_void';

		var request = new cybersourceRestApi.VoidCreditRequest();
		request.clientReferenceInformation = clientReferenceInformation;

		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
		processCredit.processACredit(function (error, data) {
			if (!error) {
				var id = data.id;
				
				instance.voidCredit(request, id, function (error, data, response) {
					if (error) {
						console.log('\n API ERROR : \n ' + JSON.stringify(error));
					}
					if (response) {
						console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
						console.log('\n API REQUEST BODY : \n' + response.request._data + '\n');
						console.log('\n API RESPONSE BODY : ' + response.text); 
						console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
						console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
					}
					console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
					callback(error, data);
				});
			}
			else{
				console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
				callback(error, data);
			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	voidACredit(function () {
	});
}
module.exports.voidACredit = voidACredit;