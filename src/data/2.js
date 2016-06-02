option = {
	        title: {

	            text: 'demo'
	        },
	        tooltip: {},
	        xAxis: {
	            type : 'value',
	            boundaryGap : false,
	            name:"x",
	            min:0,
	            max:1000,
	            splitNumber:10,
	            nameTextStyle:{
	            	color:"#fff"
	            },
	            position:"top"
	        },
	        yAxis: {
	            type : 'value',
	            name:"y",
	            min:0,
	            max:1000,
	            inverse:true,
	            splitNumber:10,
	            nameTextStyle:{
	            	color:"#fff"
	            }
	        },
	        series: [{
                type: 'graph',
                layout: 'force',
                symbolSize: 40,
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: node,
                markPoint:{
	                symbol:'rect',
	                symbolSize:'30',
	                label:"123aaa",
	               data:[{
	                   x:100,
	                   y:100
	               }]
	            }
                // links: links,
                // lineStyle: {
                //     normal: {
                //         color: '#2f4554'
                //     }
                // }
            }]
	    };