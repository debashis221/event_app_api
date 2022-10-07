const jwt = require('jsonwebtoken');
const secret_key = "ITV Biggest Secret";
exports.assign = function (userinfo_json) {
	var token;
	try {
		token = jwt.sign(userinfo_json, secret_key, { expiresIn: '900h' });
	}
	catch (e) {
		console.log("error in token assign");
		console.log(e);
		token = e;
	}
	return token;
}

exports.verify = function (token) {
	var access;
	jwt.verify(token, secret_key, {}, function (err, decrpt) {
		if (!err) {
			access = decrpt;
		}
		else {
			console.log(err);
			access = false;
		}
	});
	while (access === undefined);
	return access;
}