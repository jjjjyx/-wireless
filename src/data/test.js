define({
	markLineOpt:(function(){
		var markLineOpt = {
		    animation: false,
		    lineStyle: {
		        normal: {
		            type: 'solid'
		        }
		    },
			tooltip:{
				show:false
			}
		};
		return markLineOpt;
	})(),
	markPointOpt:(function(){
		return {
			animation:false,
			itemStyle: {
	            normal: {
	            	color:"#46bee9",
	                areaColor: '#323c48',
	                borderColor: '#404a59'
	            },
	            emphasis: {
	                areaColor: '#2a333d'
	            }
		    },
			label: {
            normal: {
	                show: true,
	                formatter: '{b}',
					color:"#000"
            	}
        	}
		}
	})(),
	getSeriesOpt:function(data){
		return {
			series: [
				{
					name: '最小生成树',
					type: 'scatter',
					_mapType:'mst',
					xAxisIndex: [0],
					yAxisIndex: [0],
					data:data
				},
				{
					name: '重心',
					type: 'scatter',
					xAxisIndex: [1],
					yAxisIndex: [1],
					_mapType:'com',
					data:data
				},
				{
					name: '凸壳',
					type: 'scatter',
					_mapType:'ch',
					xAxisIndex: [2],
					yAxisIndex: [2],
					data:data
				}
			]
		}
	},
	option:function(){

		option = {
			baseOption:{
				timeline:{
					axisType: 'value',
					autoPlay: false,
					data:[1,2,3,4,5,6,7,8,9,10],
					width: '38%',
					left:'53%',
					top:'52%'
				},
			    title: [{
			        text: '无线传感-期末作业',
			        //subtext:"by- 软件工程-酱酱酱酱油鲜",
			        x: 'center',
			        y: 0
			    },{
			    	textAlign: 'center',
			        text: "最小生成树",
			        textStyle: {
			            fontSize: 12,
			            fontWeight: 'normal'
			        },
			        left:'26%',
			        top:'48%'

			    },
			    {
			    	textAlign: 'center',
			        text: "重心",
			        textStyle: {
			            fontSize: 12,
			            fontWeight: 'normal'
			        },
			        right:'26%',
			        top:'48%'

			    },{
			    	textAlign: 'center',
			        text: "凸壳",
			        textStyle: {
			            fontSize: 12,
			            fontWeight: 'normal'
			        },
			        left:'26%',
			        bottom: 10

			    },{
			    	text:"Copyright © 2016 by - 软件工程-酱酱酱酱油鲜. All Rights Reserved. ",
					textAlign: 'right',
					right:-100,
					bottom:10,
					textStyle: {
			            fontSize: 12,
			            fontWeight: 'normal',
						color:"#ccc"
			        },

			    }],
			    grid: [
			        {x: '7%', y: '7%', width: '38%', height: '38%'},
			        {x2: '7%', y: '7%', width: '38%', height: '38%'},
			        {x: '7%', y2: '7%', width: '38%', height: '38%'},
					{width: 200, height: 200,x2:'10%',y2:'10%'}
			    ],
			    tooltip: {
			        formatter: 'Group {a}->V{b}:({c})'
			    },
				legend:{
					data: ['最小生成树', '重心', '凸壳'],
					x2:'2%',
					selected:{
						'凸壳':false
					},
					// right:-200,
				},
			    xAxis: [
			        {
			        	gridIndex: 0,
			        	type : 'value',
			            boundaryGap : false,
			            name:"x",
			            min:0,
			            max:1000,
			            splitNumber:10,
			            nameTextStyle:{
			            	color:"#fff"
			            }

		        	},
			        {
			        	gridIndex: 1,
			        	type : 'value',
			            boundaryGap : false,
			            name:"x",
			            min:0,
			            max:1000,
			            splitNumber:10,
			            nameTextStyle:{
			            	color:"#fff"
			            }
			        },
			        {
			        	gridIndex: 2,
			        	type : 'value',
			            boundaryGap : false,
			            name:"x",
			            min:0,
			            max:1000,
			            splitNumber:10,
			            nameTextStyle:{
			            	color:"#fff"
			            }
			        },
					{
						gridIndex: 3,
						type:'category',
						data:['最小生成树', '重心', '凸壳'],
						name:'x',
						splitNumber:1,
						nameTextStyle:{
			            	color:"#fff"
			            }
					}

			    ],
			    yAxis: [
			        {
			        	gridIndex: 0, type : 'value',
			            name:"y",
			            min:0,
			            max:1000,
			            splitNumber:10,
			            nameTextStyle:{
			            	color:"#fff"
			            }
			        },
			        {
			        	gridIndex: 1, type : 'value',
			            name:"y",
			            min:0,
			            max:1000,
			            splitNumber:10,
			            nameTextStyle:{
			            	color:"#fff"
			            }
			        },
			        {
			        	gridIndex: 2, type : 'value',
		            	name:"y",
		            	min:0,
		            	max:1000,
		            	splitNumber:10,
		            	nameTextStyle:{
		            		color:"#fff"
		            	}
		            },
					{
						gridIndex: 3,
						type:'value',
						name:'y',
						splitNumber:1,
						nameTextStyle:{
			            	color:"#fff"
			            }
					}

			    ],
				series: [
			        {
			            name: '最小生成树',
			            type: 'scatter',
			            _mapType:'mst',
			            xAxisIndex: [0],
			            yAxisIndex: [0],
			            //data: dataAll[0],
			            // data:[
			            // 	[200,200],{
			            // 		value:[300,300],
			            // 		name:"ads",
			            // 		id:"11"
			            // 	}
			            // ]
			            //markLine: markLineOpt
			        },
			        {
			            name: '重心',
			            type: 'scatter',
			            xAxisIndex: [1],
			            yAxisIndex: [1],
			            _mapType:'com',
			            //data: dataAll[1],
			            //markLine: markLineOpt
			        },
			        {
			            name: '凸壳',
			            type: 'scatter',
			            _mapType:'ch',
			            xAxisIndex: [2],
			            yAxisIndex: [2],
			            //data: dataAll[2],
			            //markLine: markLineOpt
			        },
					{
						name:"统计",
						type:"bar",
						xAxisIndex: [3],
			            yAxisIndex: [3],
					}
			    ]
			},
			options:[

			]

		};
		return option;
	}()
})
