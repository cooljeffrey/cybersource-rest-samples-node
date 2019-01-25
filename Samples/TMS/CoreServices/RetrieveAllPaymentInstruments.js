'use strict';

var cybersourceRestApi = require('cybersource-rest-client');
var path = require('path');
var filePath = path.join('Data','Configuration.js');
var configuration = require(path.resolve(filePath));
var createInstrumentIdentifier = require('./CreateInstrumentIdentifier');

/**
 * This is a sample code to call TMS InstrumentIdentifierApi,
 * instrumentidentifiersTokenIdGet method will retrive all paymentsIdentifier for given InstrumentIdentifier
 */

function retriveAllPaymentInstruments(callback) {
	try {
		var configObject = new configuration();
		var instance = new cybersourceRestApi.PaymentInstrumentsApi(configObject);

		var profileId = '93B32398-AD51-4CC2-A682-EA3E93614EB1';
		var options = null;
		console.log('\n[BEGIN] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
		createInstrumentIdentifier.createInstrumentIdentifier(function (error, data) {
			if (!error) {
				var tokenId = data.id;
				instance.tmsV1InstrumentidentifiersTokenIdPaymentinstrumentsGet(profileId, tokenId, options, function (error, data, response) {
					if (error) {
						console.log('\n API ERROR : \n ' + JSON.stringify(error));
					}
					if (response) {
						console.log('\n API REQUEST HEADERS : \n' + JSON.stringify(response.req._headers,0,2));
						console.log('\n API RESPONSE BODY : ' + response.text + '\n'); 
						console.log('\n API RESPONSE CODE : ' + JSON.stringify(response['status']));
						console.log('\n API RESPONSE HEADERS : \n' + JSON.stringify(response.header,0,2));
						console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
					}
					callback(error, data);					
				});
			}
			else
			{
				console.log('\n[END] REQUEST & RESPONSE OF: '+ path.basename(__filename, path.extname(__filename)) + '\n');
				callback(error, data);
			}
		});
	} catch (error) {
		console.log(error);
	}
}
if (require.main === module) {
	retriveAllPaymentInstruments(function () {
	});
}
module.exports.retriveAllPaymentInstruments = retriveAllPaymentInstruments;