require.config({
            // RequireJS 通过一个相对的路径 baseUrl来加载所有代码。baseUrl通常被设置成data-main属性指定脚本的同级目录。
            baseUrl: "./src",
            // 第三方脚本模块的别名,jquery比libs/jquery-1.11.1.min.js简洁明了；
            paths: {
                "jquery" 	: "../lib/bower/jquery/dist/jquery.min",
                "echarts"	: "../lib/echarts.min"
            }
         
        });

require(["jquery","echarts"], function ($,echarts) {
	var myChart = echarts.init(document.getElementById('main'));

    var axisData = ['周一','周二','周三','周四','周五','周六','周日'];
    var data = axisData.map(function (item, i) {
        return Math.round(Math.random() * 1000 * (i + 1));
    });
    var links = data.map(function (item, i) {
        return {
            source: i,
            target: i + 1
        };
    });
    links.pop();
    option = {
        title: {
        	
            text: '笛卡尔坐标系上的 Graph'
        },
        tooltip: {},
        xAxis: {
            type : 'category',
            boundaryGap : false,
            data : axisData
        },
        yAxis: {
            type : 'value'
        },
        series: [
            {
                type: 'graph',
                layout: 'none',
                coordinateSystem: 'cartesian2d',
                symbolSize: 40,
                label: {
                    normal: {
                        show: true
                    }
                },
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                data: data,
                links: links,
                lineStyle: {
                    normal: {
                        color: '#2f4554'
                    }
                }
            }
        ]
    };
    myChart.setOption(option);
});

// define(function(){

// 	return {
// 		init:function(){

// 		}
// 	}
// });