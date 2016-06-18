var utils = require("./utils");
module.exports = (function(utils){
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
	        edge.push({
	        	point1:nodes[mst[minid]-1],
	        	point2:nodes[minid-1],
	        	weight:min
	        });
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
		exec:function(nodes){
			// console.log(this.prim(this.getAllLineWeightByNode(nodes),nodes.length,nodes))
			return prim(this.getAllLineWeightByNode(nodes),nodes.length,nodes)
		},
		getAllLineWeightByNode:function(nodes){
			var taa  = [];
			for(var i = 1,l = nodes.length;i<=l;i++){
				taa[i] = []
				for(var j = 1;j<=l;j++){
					if(i == j) continue;
					taa[i][j] = utils.getPointLength(nodes[i-1],nodes[j-1])
				}
			}
			return taa;
		}
	};
})(utils);
