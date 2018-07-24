
const handlers = require('./handlers.js');


function router(request, response) {

  const url = request.url;

  const extension = url.split('.')[1];

  if (url === '/') {

    handlers.serveHome(request, response);

  } else if (extension === 'css' || extension === 'js' || extension === 'html' || extension === 'ico') {
   
    handlers.serveFiles(request, response);
 
} else if (url.indexOf('/api/suggestions') !== -1) {
   
    handlers.serveAPI(request, response);
  
} else {
  
    handlers.pageNotFound(request, response);
  }
};

module.exports = router;
