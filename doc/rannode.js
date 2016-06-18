exports.rand=function(numbers,bout){
	var node = [];
	for(var i = 1;i<=numbers;i++){
		node.push([Math.round(Math.random() * 999 ),Math.round(Math.random() * 999)]);
	}
	return node;
}
