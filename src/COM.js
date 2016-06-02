define(['data/test'],function(test){


	var  point_size = 5; // 顶点个数
	// Point array[point_size] = {{1,1}, {1,3}, {3,4}, {3.5,2},{5,1}}; //顶点数组
	var array = [];
	array.push(new Point(1,1))
	array.push(new Point(1,3))
	array.push(new Point(3,4))
	array.push(new Point(3.5,2))
	array.push(new Point(5,1))

    function Point(x,y){
    	this.x = x;
    	this.y = y;
    }

    function center_gravity(arr,size){
    	var temp,
			area=0,
			cx = 0,
			cy = 0;
		for (var i = 0;i<size-1;i++){
			temp = arr[i]['value'][0] * arr[i+1]['value'][1] - arr[i]['value'][1] *arr[i+1]['value'][0];
			area+= temp;
			cx+= temp * (arr[i]['value'][0]+arr[i+1]['value'][0]);
			cy+= temp * (arr[i]['value'][1]+arr[i+1]['value'][1]);
		}
		temp = arr[size-1]['value'][0] * arr[0]['value'][1] - arr[size-1]['value'][1] *arr[0]['value'][0];
		area+= temp;
		cx+= temp * (arr[size-1]['value'][0]+arr[0]['value'][0]);
		cy+= temp * (arr[size-1]['value'][1]+arr[0]['value'][1]);

		area = area/2;
		cx = cx/(6*area);
		cy = cy/(6*area);
		return {
			coord:[Math.abs(cx),Math.abs(cy)],
			name:"重心"
		};
    }
    // var center = center_gravity(array,point_size);
    // console.log(center);
	return {
		center:center_gravity,
		_test:function(nodes,length){
			var daa =this.center(nodes,length);
			console.log(daa)
			return {
				markPoint:$.extend({data:[daa]},test.markPointOpt)
			}
		}
	};
});
