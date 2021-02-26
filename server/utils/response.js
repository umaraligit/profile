/**
 * Response handler
 *
 * Centralized location to standardize api responses
 */

module.exports = {

	send_response_json: function (res, data, statusCode = 200) {
		res.status(statusCode).json({status: "OK", response: data});
	},

	send_error_json: function (res, message, statusCode = 400) {
		console.log("Error:", statusCode, JSON.stringify(message));
		res.status(statusCode).json({status: "Error", error: message});
	}

};
