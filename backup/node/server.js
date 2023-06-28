var http = require("http");
var url = require("url");

function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("收到来自" + pathname + "的请求.");

    response.writeHead(200, {"Content-Type": "text/plain"});
    var content = route(handle, pathname);
    response.write(content);
    response.end();
  }

  http.createServer(onRequest).listen(9876);
  console.log("老厉害的服务器已经成功起来了，颤抖吧！");
}

exports.start = start;