
function filterJson(arr, like) {
return arr.filter(function(elem){
    return elem.indexOf(like) !== -1
  });
}

module.exports = filterJson;
