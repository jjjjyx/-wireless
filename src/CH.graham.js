define(['data/test','utils'],function(test,utils){

        /**
         * 按横坐标排序
         */
        var sortByX = function sortByX(A, B) {
            return A[0] - B[0];
        };

        /**
         * 按纵坐标排序
         */
        var sortByY = function sortByY(A, B) {
            return A[1] - B[1];
        };

        /**
         * 获得点集中纵坐标最小的点
         */
        var getMinYPoint = function getMinYPoint(points) {
            var y = Infinity;
            var yIndex = -1;
            points.forEach(function (P, index) {
                if (P[1] < y) {
                    y = P[1];
                    yIndex = index;
                }
            });
            return points[yIndex];
        };
        var isSamePoint = function isSamePoint(A, B) {
    	    return A[0] === B[0] && A[1] === B[1];
    	};
        /**
    	 * 点集的逆时针排序（按与纵坐标最小的点水平方向极角由小到大）
    	 */
    	var counterclockwiseSort = function counterclockwiseSort(points) {
    	    var O = getMinYPoint(points);
    	    return points.sort(function (A, B) {
    	        if (isSamePoint(A, O)) {
    	            return -1;
    	        }
    	        if (isSamePoint(B, O)) {
    	            return 1;
    	        }
    	        var thetaA = polarTheta(O, A);
    	        var thetaB = polarTheta(O, B);
    	        return thetaA - thetaB;
    	    });
    	};

	/**
	 * 求A点相对于OX的极角
	 */
	var polarTheta = function polarTheta(O, A) {
	    var deltaX = A[0] - O[0];
	    var deltaY = A[1] - O[1];
	    if (deltaX === 0) {
	        if (deltaY === 0) {
	            return 0;
	        } else if (deltaY > 0) {
	            return Math.PI / 2;
	        } else {
	            return 3 * Math.PI / 2;
	        }
	    }
	    if (deltaX > 0 && deltaY >= 0) {
	        // 第一象限
	        return Math.atan(deltaY / deltaX);
	    } else if (deltaX > 0 && deltaY < 0) {
	        // 第四象限
	        return Math.atan(deltaY / deltaX) + 2 * Math.PI;
	    } else if (deltaX < 0) {
	        // 第二、三象限
	        return Math.atan(deltaY / deltaX) + Math.PI;
	    }
	};

	/**
	 * 求P点相对于极轴OA的极角
	 */
	var polarThetaByOA = function polarThetaByOA(O, A, P) {
	    return polarTheta(O, P) - polarTheta(O, A);
	};

	/**
	 * 求AB两点之间距离的平方
	 */
	var squareDistance = function squareDistance(A, B) {
	    return Math.pow(A[0] - B[0], 2) + Math.pow(A[1] - B[1], 2);
	};
    /**
	 * OABC为四个不同点，判断B,C是否在直线OA同侧
	 */
	var isOnSameSide = function isOnSameSide(O, A, B, C) {
	    var v = ((C[0] - O[0]) * (A[1] - O[1]) - (A[0] - O[0]) * (C[1] - O[1])) / ((B[0] - O[0]) * (A[1] - O[1]) - (A[0] - O[0]) * (B[1] - O[1]));
	    return v > 0;
	};
	/**
	 * 点集的逆时针排序（按与纵坐标最小的点水平方向极角由小到大）
	 */
	var counterclockwiseSort = function counterclockwiseSort(points) {
	    var O = getMinYPoint(points);
	    return points.sort(function (A, B) {
	        if (isSamePoint(A, O)) {
	            return -1;
	        }
	        if (isSamePoint(B, O)) {
	            return 1;
	        }
	        var thetaA = polarTheta(O, A);
	        var thetaB = polarTheta(O, B);
	        return thetaA - thetaB;
	    });
	};
    /**
	 * 预处理，按照与P0的水平方向极角从小到大排序
	 */
	var preGrahamScan = function preGrahamScan(points) {
	    var O = points[0];
	    points.reduce(function (prev, current, index) {
	        if (isSamePoint(prev, current)) {
	            points.splice(index, 1);
	            return prev;
	        }
	        var thetaPrev = polarTheta(O, prev);
	        var thetaCurrent = polarTheta(O, current);
	        // 0.00001：控制精度
	        if (Math.abs(thetaPrev - thetaCurrent) < 0.00001) {
	            if (squareDistance(O, thetaPrev) >= squareDistance(O, thetaCurrent)) {
	                points.splice(index, 1);
	                return prev;
	            }
	            points.splice(index - 1, 1);
	        }
	        return current;
	    });
	    return points;
	};
    /**
	 * Graham-Scan算法凸包求解
	 */
	var grahamScan = function grahamScan(_points) {
	    var ifPreScan = arguments.length <= 1 || arguments[1] === undefined ? true : arguments[1];

	    var P = undefined;
	    var points = counterclockwiseSort(_points);
	    if (ifPreScan) {
	        P = preGrahamScan(points);
	    } else {
	        P = points;
	    }
	    var Q = []; // 这里用数组模拟栈
	    if (P.length <= 3) {
	        return P;
	    }
	    for (var i = 0; i < 3; i++) {
	        Q.push(P[i]);
	    }
        var wai = []
	    for (var i = 3; i < P.length; i++) {
	        while (Q.length > 2 && isOnSameSide(P[i], Q[Q.length - 2], P[0], Q[Q.length - 1])) {
                wai.push(Q.pop());
	        }
	        Q.push(P[i]);
	    }
	    return {
            bump:Q,
            wai:wai
        };
	};
    Array.prototype.remove=function(dx){
        if(isNaN(dx)||dx>this.length){return false;}
        for(var i=0,n=0;i<this.length;i++){
            if(this[i]!=this[dx]){
                this[n++]=this[i]
            }
        }
        if(this.length)
            this.length-=1;
        return this;
    }
    var ch = function ch(lines,isTu){
        var style = {
            normal:{
                color:'#f00'
            }
        }
        lines.sort(function(a,b){
            return a[2]-b[2];
        }).pop();
        if(isTu.length){
            //按照点到边的距离排序
            isTu.forEach(function(item){
                var lintIndex =lines.reduce(function(prev,current,index){
                    var minLength=utils.getPointToLineLength(current[0].coord,current[1].coord,item,true);
                    if(minLength)
                        return prev[0]==0?[minLength,index]:(prev[0]<minLength?prev:[minLength,index]);
                    else return prev;
                },[0,0]);
                //var deldLine = lines[lintIndex[1]];
                item.push(lintIndex);
            });
            function delEdge(delIndex,newPoint){
                var deldLine = lines[delIndex];
                lines.remove(delIndex);
                lines.push(
                    [{
                        coord:newPoint,
                        symbol:'none',
                        lineStyle:style
                    },{
                        coord:deldLine[0].coord,
                        symbol:'none',
                        lineStyle:style
                    }
                ]);
                lines.push(
                    [{
                        coord:newPoint,
                        symbol:'none',
                        lineStyle:style
                    },{
                        coord:deldLine[1].coord,
                        symbol:'none',
                        lineStyle:style
                    }
                ]);
            }
            isTu.sort(function(a,b){
                return a[2][0]-b[2][0];
            }).forEach(function(item,index){
                if(index==0){
                    delEdge(item[2][1],item.slice(0,2))
                }else{
                    var lintIndex =lines.reduce(function(prev,current,index){
                        var minLength=utils.getPointToLineLength(current[0].coord,current[1].coord,item.slice(0,2),true);
                        if(minLength)
                            return prev[0]==0?[minLength,index]:(prev[0]<minLength?prev:[minLength,index]);
                        else return prev;
                    },[0,0]);
                    // lines.map(function(item,index){
                    //     return [utils.getPointToLineLength(current[0].coord,current[1].coord,item.slice(0,2)),index]
                    // }).sort(function(a,b){
                    //     return a[0]-b[0]
                    // })
                    delEdge(lintIndex[1],item.slice(0,2));
                }
            })
            // delEdge(isTu[0][2][1],isTu[0].slice(0,2))
            // //
            // console.log(isTu)
            // if(isTu.length>=2){
            //     var lintIndex =lines.reduce(function(prev,current,index){
            //         var minLength=utils.getPointToLineLength(current[0].coord,current[1].coord,isTu[1].slice(0,2));
            //         console.log(minLength)
            //         return prev[0]==0?[minLength,index]:(prev[0]<minLength?prev:[minLength,index]);
            //     },[0,0]);
            //     console.log(lintIndex);
            //     //delEdge(lintIndex[1],isTu[0].slice(0,2));
            // }

            // .forEach(function(item,index){
            //     var deldLine;
            //     if(index==0){
            //         delEdge(item[2][1],item.slice(0,2))
            //     }else{
            //         var lintIndex =lines.reduce(function(prev,current,index){
            //             var minLength=utils.getPointToLineLength(current[0].coord,current[1].coord,item);
            //             return prev[0]==0?[minLength,index]:(prev[0]<minLength?prev:[minLength,index]);
            //         },[0,0]);
            //         delEdge(lintIndex[1],item.slice(0,2));
            //     }
            // });
        }
        console.log(lines);
        return lines;
    }
    return {
        getGrahamScan:(function(){
            var r = null;
            return function(nodes,over){
                if(!r||over){
                    var points = []
                    nodes.forEach(function(item){
                        points.push(item.value);
                    });
                    return grahamScan(points)
                }else
                    return r;
            }

        })(),
        _test:function(nodes,length,padding){
            var lines = [];
            var r = this.getGrahamScan(nodes);
            for(var i = 0,l= r.bump.length;i<l;i++){
                var n1 = r.bump[i],
                    n2 = r.bump[i+1>=l?0:(i+1)];
                lines.push([{
                            coord:n1,
                            symbol:'none'
                        },{
                            coord:n2,
                            symbol:'none'
                        },utils.getPointLength(n1,n2)
                    ])
            }
            this.getGrahamScan(nodes,true);
            //去除最长的边
            // if()

            lines = ch(lines,r.wai);
            pointData = utils.getLinesLength(lines,padding)
            return {
                s:{
                    markLine:$.extend({data:lines},test.markLineOpt),
                    markPoint:$.extend({data:pointData.point},test.markPointOpt,{symbol:'circle',symbolSize:5,label: {normal: {show:false},tooltip:{show:false}}})
                },
                d:pointData.count

            }
        }
    }
});
