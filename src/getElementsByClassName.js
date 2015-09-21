// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var nodesWithClass = [];
  var node
  var passedNode = Array.prototype.slice.call(arguments, 1)[0];
  node = passedNode !== undefined ? passedNode : document.body;
  if(node.classList && node.classList.contains(className)) {
    nodesWithClass.push(node);  
  }
  if(node.childNodes && node.childNodes.length > 0) {
    for(var i = 0; i < node.childNodes.length; i++){
      var childs = getElementsByClassName(className, node.childNodes[i]);
      if(childs.length > 0) {
        childs.forEach(function(item){
          nodesWithClass.push(item);
        });
      }
    }
  }
  return nodesWithClass;
};
