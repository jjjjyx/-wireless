define(['data/test',"CH.graham"],function(test,ch){


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
			coord:[Math.abs(cx),Math.abs(cy)],
			name:"重心",
			symbol:'pin',
			symbolSize:40,
			label: {normal: {show:true,formatter: function (param) {
                            return param != null ?'重心' : '';
                        }},tooltip:{show:false}}
		};
    }
    // var center = center_gravity(array,point_size);
    // console.log(center);
	return {
		center:center_gravity,
		_test:function(nodes,length,padding){
			var tuPoint = ch.getGrahamScan(nodes,true);
			var daa =this.center(tuPoint.bump,tuPoint.bump.length);
			// if(daa.coord[0]<1000&&daa.coord[1]<1000){
				var line = [];
				nodes.forEach(function(item){
					line.push([{
						coord:item.value,
	        			symbol:'none'
					},{
						coord:daa.coord,
	        			symbol:'none'
					}])
				});

				var pointData = utils.getLinesLength(line,padding);
				var p =$.extend({data:pointData.point},test.markPointOpt,{symbol:'circle',symbolSize:5,label: {normal: {show:false},tooltip:{show:false}}})
				p.data.push(daa)
				return {
					s:{
						markLine:$.extend({data:line},test.markLineOpt),
						markPoint:p
					},
					d:pointData.count
				}
			// }else{
			// 	console.log('重心计算有误');
			// 	return {}
			// }

		}
	};
});
