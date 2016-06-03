define(['data/test','utils'],function(test,utils){
	//1 计算所有边的权值，产生input 数组 初始化成graph
	//2 调用prim 方法计算，返回边的集合
	//3 渲染边

	var graph = [];
	var input =[[1 ,2 ,6],
		[1 ,4 ,1],
		[1 ,3 ,5],
		[1 ,5 ,2],
		[2 ,3 ,5],
		[2 ,5 ,3],
		[3 ,4 ,5],
		[3 ,5 ,6],
		[3 ,6 ,4],
		[4 ,6 ,2],
		[5 ,6 ,6]
	];
	for (var k = 0; k < 11; k++)
    {
        // in >> i >> j >> cost;
        graph[input[k][0]] = graph[input[k][0]]||[]
        graph[input[k][1]] = graph[input[k][1]]||[]

        graph[input[k][0]][input[k][1]] = input[k][2];
        graph[input[k][1]][input[k][0]] = input[k][2];
    }
	function prim(graph,n,nodes){

		var lowcost = [],
	    	mst = [],
	    	i, j, min, minid, sum = 0
	    	edge = [];

	    for (i = 2; i <= n; i++)  {
	        lowcost[i] = graph[1][i]||999999;
	        mst[i] = 1;
	    }
    	mst[1] = 0;
    	for (i = 2; i <= n; i++)  {
	        min = 999999;
	        minid = 1;
	        for (j = 2; j <= n; j++){
	            if (lowcost[j] < min && lowcost[j] != 0){
	                min = lowcost[j];
	                minid = j;
	            }
	        }
	        // console.log( "V" + mst[minid] +"-V" + minid +"=" +min);
	        edge.push([{
	        			coord:nodes[mst[minid]-1].value,
	        			symbol:'none'
	        		},{
	        			coord:nodes[minid-1].value,
	        			symbol:'none'
	        		}
	        	]);
	        sum += min;
	        lowcost[minid] = 0;
	        for (j = 2; j <= n; j++) {
	        	if(graph[minid])
	        		graph[minid][j] = graph[minid][j]||999999
	            if (graph[minid][j] < lowcost[j]){
	                lowcost[j] = graph[minid][j];
	                mst[j] = minid;
	            }
	        }
	    }

		return {
			weight:sum,
			edgeData:edge
		};
	}
	return {

		prim:prim,
		_test:function(nodes,length,padding){
			// console.log(utils.getValue)
			var input=[]
				graph = [];
			for(var i = 0;i<length;i++){
				for(var j = i+1;j<length;j++){
					input.push([parseInt(nodes[i].id),parseInt(nodes[j].id),utils.getPointLength(nodes[i].value,nodes[j].value)])
				}
			}
			for (var k = 0; k < input.length; k++)  {
		        graph[input[k][0]] = graph[input[k][0]]||[]
		        graph[input[k][1]] = graph[input[k][1]]||[]

		        graph[input[k][0]][input[k][1]] = input[k][2];
		        graph[input[k][1]][input[k][0]] = input[k][2];
		    }
			var lineData = this.prim(graph,length,nodes).edgeData,
				pointData = utils.getLinesLength(lineData,padding)
		    return {
				s:{
			    	markLine:$.extend({data:lineData},test.markLineOpt),
					markPoint:$.extend({data:pointData.point},test.markPointOpt,{symbol:'circle',symbolSize:5,label: {normal: {show:false},tooltip:{show:false}}})
				},
				d:pointData.count
		    }
		    //组装

		}
	};
});
