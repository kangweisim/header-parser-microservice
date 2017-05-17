var express = require('express');
var useragent = require('useragent');
var requestIp = require('request-ip');
var app = express();
var output = {};

app.use(requestIp.mw());

app.use(function (req, res) {
	if (req.url === "/whoami") {
		output.ipaddress = req.clientIp;
		var agent = useragent.parse(req.headers['user-agent']);
		output.language = req.headers["accept-language"];
		output.software = agent.os.toString();
	}
	res.end(JSON.stringify(output));
});
app.listen(8080, function() {
	console.log('Header Parser Microservice app listening on port 8080.');
});
