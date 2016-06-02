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
			temp = arr[i].x * arr[i+1].y - arr[i].y *arr[i+1].x;
			area+= temp;
			cx+= temp * (arr[i].x+arr[i+1].x);
			cy+= temp * (arr[i].y+arr[i+1].y);
		}
		temp = arr[size-1].x * arr[0].y - arr[size-1].y *arr[0].x;
		area+= temp;
		cx+= temp * (arr[size-1].x+arr[0].x);
		cy+= temp * (arr[size-1].y+arr[0].y);

		area = area/2;
		cx = cx/(6*area);
		cy = cy/(6*area);
		return {x:cx,y:cy};
    }
    // var center = center_gravity(array,point_size);
    // console.log(center);
	return {
		center:center_gravity,
		_test:function(nodes,length){
			return {
				markPoint:$.extend({data:[this.center_gravity(nodes,length)]},test.markPointOpt)
			}
		}
	};
});