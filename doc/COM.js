var ccc = require("./CH.graham");
module.exports = (function(ch){
	// var  point_size = 5; // 顶点个数
	// // Point array[point_size] = {{1,1}, {1,3}, {3,4}, {3.5,2},{5,1}}; //顶点数组
	// var array = [];
	// array.push(new Point(1,1))
	// array.push(new Point(1,3))
	// array.push(new Point(3,4))
	// array.push(new Point(3.5,2))
	// array.push(new Point(5,1))

 //    function Point(x,y){
 //    	this.x = x;
 //    	this.y = y;
 //    }
    function center_gravity(arr,size){
    	var temp,
			area=0,
			cx = 0,
			cy = 0;
		for (var i = 0;i<size-1;i++){
			temp = arr[i][0] * arr[i+1][1] - arr[i][1] *arr[i+1][0];
			area+= temp;
			cx+= temp * (arr[i][0]+arr[i+1][0]);
			cy+= temp * (arr[i][1]+arr[i+1][1]);
		}
		temp = arr[size-1][0] * arr[0][1] - arr[size-1][1] *arr[0][0];
		area+= temp;
		cx+= temp * (arr[size-1][0]+arr[0][0]);
		cy+= temp * (arr[size-1][1]+arr[0][1]);

		area = area/2;
		cx = cx/(6*area);
		cy = cy/(6*area);
		return {
			point:[Math.abs(cx),Math.abs(cy)]
		}
    }
	return {
		exec:function(nodes){
			var tuPoint = ch.getGrahamScan(nodes,true);
			return center_gravity(tuPoint.bump,tuPoint.bump.length);
		}
	};
})(ccc);
