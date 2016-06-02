define(["echarts","data/test","rannode","MST","COM"],function(echarts,test,rannode,mst,com){
		var myChart = echarts.init(document.getElementById('main'))
		
	    myChart.setOption(test.option);
	    window.onresize = myChart.resize;
	    var _map = {
	    	"mst":mst,
	    	"com":com
	    }
	return {
		play:function(numbers,bout){
			//console.log(arguments);
			if(numbers&&bout){
				var nodes = rannode.rand(numbers,bout);

				test.option.series.forEach(function(item){
					var data = _map[item._mapType]&&_map[item._mapType]._test(nodes,numbers);
					if(data)
					for(var k in data){
						item[k] = data[k]
					}
					item.data =nodes;
				});
				myChart.setOption(test.option);
			}else{
				throw new Error("没有提交正常的参数");
			}
			return ;
		}
	}
});


				// option.series[0].data = [];
				// myChart.setOption(option);
				// for(var i = 0;i<numbers;i++){
				// 	option.series[0].data.push({
				// 		category: 0,
				// 		id: i,
				// 		itemStyle: null,
				// 		label:{
				// 			normal:{
				// 				show:true
				// 			}
				// 		},
				// 		name: i+1,
				// 		symbolSize:20,
				// 		value: i,
				// 		x: Math.round(Math.random() * 1000 + i),
				// 		y: Math.round(Math.random() * 1000 + i)
				// 	});
				// }
				// console.log(option);
				// myChart.setOption(option);
				// console.log(myChart.getOption().series[0].data.length);

// $("#paramds-modal").
