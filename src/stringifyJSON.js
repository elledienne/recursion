// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var each = function(collection, callback) {
  if(Array.isArray(collection)) {
    for(var i = 0; i < collection.length; i++) {
      callback(collection[i], i, collection);
    }
  } else if(typeof collection === 'object') {
    for(var key in collection) {
      callback(collection[key], key, collection);
    }
  } else {
    callback(collection);
  }
}

var stringifyJSON = function(obj) {
  var objType = typeof obj;

  if(objType === 'function' || objType === 'undefined') {
    return undefined;
  } else if(objType !== 'object' || obj === null){
    if(objType === 'string') {
      return '"' + obj + '"';
    }
    return '' + obj;
  } else {
    var isArray = Array.isArray(obj);
    var props = [];
    var open = isArray ? '[' : '{';
    var close = isArray ? ']' : '}';
    each(obj, function(value, key) {
      key = isArray ? '' : stringifyJSON(key) + ':';
      value = stringifyJSON(value);
      if(!(!isArray && value === undefined)) {
        props.push(key + value);
      }
    });
    return open + props.join(',') + close;
  }
};
