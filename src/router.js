const handlers = require("./handlers.js");

function router(request, response) {
  const url = request.url;

  const extension = url.split(".")[1];

  if (url === "/") {
    handlers.serveHome(request, response);
  } else if (url.indexOf("/api/suggestions") !== -1) {
    handlers.serveAPI(request, response);
  }else if(url.indexOf("/api/info")!== -1) {
    handlers.serveInfoAPI(request, response);
  }
  else {
    handlers.serveFiles(request, response);
  }
}

module.exports = router;
