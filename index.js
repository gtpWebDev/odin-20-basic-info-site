var http = require("http");
var url = require("url");
var fs = require("fs");

http
  .createServer(function (req, res) {
    var q = url.parse(req.url, true);

    const filename = q.path === "/" ? "./index.html" : "." + q.path;

    fs.readFile(filename, function (err, data) {
      if (err) {
        const errorPage = "./404.html";
        fs.readFile(errorPage, function (err2, data2) {
          res.writeHead(404, { "Content-Type": "text/html" });
          res.write(data2);
          return res.end();
        });
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(data);
        return res.end();
      }
    });
  })
  .listen(8080);
