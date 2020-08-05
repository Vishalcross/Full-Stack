const http = require("http");
const path = require("path");
const fs = require("fs");

const hostname = "localhost";
const port = 3000;

const server = http.createServer((req, res) => {
	console.log(`Request for ${req.url} using method ${req.method}`);

	if (req.method == "GET") {
		let fileURL = null;
		if (req.url == "/") {
			fileURL = "/index.html";
		} else fileURL = req.url;
		let filePath = path.resolve("./public" + fileURL);
		if (path.extname(filePath) == ".html") {
			fs.exists(filePath, (exists) => {
				if (!exists) {
					res.statusCode = 404;
					res.setHeader("Content-Type", "text/html");
					res.end(
						`<html>Error: 404<br>File url ${fileURL} not found</html>`
					);
				} else {
					res.statusCode = 200;
					res.setHeader("Content-Type", "text/html");
					fs.createReadStream(filePath).pipe(res);
				}
			});
		} else {
			res.statusCode = 404;
			res.setHeader("Content-Type", "text/html");
			res.end(`<html>Error: 404<br>File url ${fileURL} not found</html>`);
		}
	} else {
		res.statusCode = 404;
		res.setHeader("Content-Type", "text/html");
		res.end(`<html>Error: 404<br>${req.method} not supported</html>`);
	}
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}`);
});
