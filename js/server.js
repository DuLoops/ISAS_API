let http = require('http');
let url = require('url');


http.createServer(function (req, res) {
  let q = url.parse(req.url, true);
  res.writeHead(200, {
    "Content-type": "text/html",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*"
  });


  if (req.method == 'POST') {
    let body = "";
    req.on('data', function (chunk) {
      if (chunk != null) {
        body += chunk;
      }
    });
    req.on('end', function () {
      let q = url.parse(body, true);
      res.end(`Name: ${q.query["name"]}, Age: ${q.query["score"]}`);
    });
  }
}).listen(8888);
