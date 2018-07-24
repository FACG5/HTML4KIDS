
function filterJson(obj,like){
    var newobj = {};
    Object.keys(obj).forEach(function(elem){
        if (elem.indexOf(like) !== -1 ) 
        newobj[elem]=obj[elem];

    });

    return newobj;
}

module.exports = filterJson;