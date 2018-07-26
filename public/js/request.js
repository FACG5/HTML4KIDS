//function for request(fetch)
const connect = function(value, method, url, cb) {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var response;
      if (xhr.responseText !== "") {
        response = JSON.parse(xhr.responseText);
      } else {
        response = "";
      }
      cb(response);
    }
  };
  xhr.open(method, url);
  xhr.send(value);
};
