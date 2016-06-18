define([
	"echarts",
	"data/test",
	"rannode",
	"MST",
	"COM",
	"CH.graham",
	"option"
],function(
	echarts,
	test,
	rannode,
	mst,
	com,
	ch,
	option
){
		var myChart = echarts.init(document.getElementById('main'))

	    myChart.setOption(test.option);
	    window.onresize = myChart.resize;
	    var _map = {
	    	"mst":mst,
	    	"com":com,
			'ch':ch
	    }
	return {
		isResult:false,
		play:function(numbers,bout){
			//console.log(arguments);
			if(numbers&&bout){
				try {
					var timeL = [];
					test.option.options = [];
					test.option.baseOption.data = timeL;
					myChart.setOption(test.option);
					for(var i = 0 ;i<bout;i++){
						timeL.push(i+1);
						var nodes = rannode.rand(numbers,bout);
						var se = test.getSeriesOpt(nodes)//$.extend({},test.seriesOpt);
						var bardata = []
						se.series.forEach(function(item){
							var data = _map[item._mapType]&&_map[item._mapType]._test(nodes,numbers,option.getOptions('route-padding'));
							if(data&&data.s){
								for(var k in data.s){
									item[k] = data.s[k]
								}
								data.d&&bardata.push(data.d)
							}
							item.data =nodes;

						});
						// console.log(se.series[0].data)
						// console.log(test.seriesOpt)
						se.series.push({
							data:bardata
						})
						test.option.options.push(se)
					}
					test.option.baseOption.data = timeL;
					console.log(test.option);
					myChart.setOption(test.option);
					this.isResult = true;
				} catch (e) {
					console.log(e);
					alert("发送异常,请重试！");
				}
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
