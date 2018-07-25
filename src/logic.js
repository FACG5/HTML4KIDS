// var mainJson = {ahmad:'ahmad',marwan:'marwan',asma:'asma',ali:'ali',lubna:'lubna'}
// var mainJson = require("./html.json");


function filterJson(arr, like) {
  var newarr = [];
  arr.forEach(function(elem,index) {
    if (elem.indexOf(like) !== -1) 
    newarr.push(elem);
  });
  return newarr;
}

// filterJson(mainJson,'h');
module.exports = filterJson;
