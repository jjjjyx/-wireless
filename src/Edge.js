function Edge(begin,end,weight) {
	this.begin = begin;
    this.end = end;
    this.weight = weight;
};
['Begin','End','Weight'].forEach(function(item){
	Edge.prototype['get'+item] = function(){
		return this[item];
	}
	Edge.prototype['set'+item] = function(value){
		return this[item] = value;
	}
})
define(function(){
	return Edge;
})