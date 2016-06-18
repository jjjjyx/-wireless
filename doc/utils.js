module.exports = (function(){
    var utils = {
           each: function each(obj, iterator, context) {
               if (obj === null) {
                   return;
               }
               if (obj.length === +obj.length) {
                   for (var i = 0, l = obj.length; i < l; i++) {
                       if (iterator.call(context, obj[i], i, obj) === false) {
                           return false;
                       }
                   }
               } else {
                   for (var key in obj) {
                       if (obj.hasOwnProperty(key)) {
                           if (iterator.call(context, obj[key], key, obj) === false) {
                               return false;
                           }
                       }
                   }
               }
           },

           extend: function extend(t) {
               var a = arguments, notCover = this.isBoolean(a[a.length - 1]) ? a[a.length - 1] : false, len = this.isBoolean(a[a.length - 1]) ? a.length - 1 : a.length;
               for (var i = 1; i < len; i++) {
                   var x = a[i];
                   for (var k in x) {
                       if (!notCover || !t.hasOwnProperty(k)) {
                           t[k] = x[k];
                       }
                   }
               }
               return t;
           },

           deepExtend: function(t, s) {
               var a = arguments, notCover = this.isBoolean(a[a.length - 1]) ? a[a.length - 1] : false, len = this.isBoolean(a[a.length - 1]) ? a.length - 1 : a.length;
               for (var i = 1; i < len; i++) {
                   var x = a[i];
                   for (var k in x) {
                       if (!notCover || !t.hasOwnProperty(k)) {
                           if (this.isObject(t[k]) && this.isObject(x[k])) {
                               this.deepExtend(t[k], x[k], notCover);
                           } else {
                               t[k] = x[k];
                           }
                       }
                   }
               }
               return t;
           },
           clone: function clone(obj) {
               var cloned = {};
               for (var m in obj) {
                   if (obj.hasOwnProperty(m)) {
                       cloned[m] = obj[m];
                   }
               }
               return cloned;
           },
           copy: function copy(obj) {
               if (typeof obj !== "object") return obj;
               if (typeof obj === "function") return null;
               return JSON.parse(JSON.stringify(obj));
           },
           queryPath: function(path, obj) {
               var arr = path.split(".");
               var i = 0, tmp = obj, l = arr.length;
               while (i < l) {
                   if (arr[i] in tmp) {
                       tmp = tmp[arr[i]];
                       i++;
                       if (i >= l || tmp === undefined) {
                           return tmp;
                       }
                   } else {
                       return undefined;
                   }
               }
           },
           getValue: function(value, defaultValue) {
               return value !== undefined ? value : defaultValue;
           },
           flatten: function flatten(arr) {
               var result = [], length = arr.length, i;
               for (i = 0; i < length; i++) {
                   if (arr[i] instanceof Array) {
                       result = result.concat(utils.flatten(arr[i]));
                   } else {
                       result.push(arr[i]);
                   }
               }
               return result;
           },
           paralle: function paralle(v1, v2, op) {
               var Class, field, index, name, value;
               // 数组
               if (v1 instanceof Array) {
                   value = [];
                   for (index = 0; index < v1.length; index++) {
                       value.push(utils.paralle(v1[index], v2[index], op));
                   }
                   return value;
               }
               // 对象
               if (v1 instanceof Object) {
                   // 如果值是一个支持原始表示的实例，获取其原始表示
                   Class = v1.getClass && v1.getClass();
                   if (Class && Class.parse) {
                       v1 = v1.valueOf();
                       v2 = v2.valueOf();
                       value = utils.paralle(v1, v2, op);
                       value = Class.parse(value);
                   } else {
                       value = {};
                       for (name in v1) {
                           if (v1.hasOwnProperty(name) && v2.hasOwnProperty(name)) {
                               value[name] = utils.paralle(v1[name], v2[name], op);
                           }
                       }
                   }
                   return value;
               }
               // 是否数字
               if (false === isNaN(parseFloat(v1))) {
                   return op(v1, v2);
               }
               return value;
           },
           /**
            * 创建 op 操作的一个平行化版本
            */
           parallelize: function parallelize(op) {
               return function(v1, v2) {
                   return utils.paralle(v1, v2, op);
               };
           },
             /**
              * 计算2点间 的距离
              */
            getPointLength:function(node,node2){
              return Math.pow( Math.pow(node[0]-node2[0],2)+ Math.pow(node[1]-node2[1],2), 0.5);
            },
            /**
             * 判断点(node3)与直线(node1,node2)的垂足是否在线段(node1,node2)上
             */
            isPointInSegments:function(node1,node2,node3){
                return (node3[0]>node1[0]&&node3[0]<node2[0])||(node3[0]<node1[0]&&node3[0]>node2[0])
            },
            // qreal A = (pt1.y()-pt2.y())/(pt1.x()- pt2.x());
            // qreal B = (pt1.y()-A*pt1.y());
            // /// > 0 = ax +b -y;  对应垂线方程为 -x -ay + m = 0;(mm为系数)
            // /// > A = a; B = b;
            // qreal m = pt3.x() + A*pt3.y();
            //
            // /// 求两直线交点坐标
            // QPointF ptCross;
            // ptCross.setX((m-A*B)/(A*A + 1));
            // ptCross.setY(A*ptCross.x()+B);

            /****点到直线的距离***
             * 过点（x1,y1）和点（x2,y2）的直线方程为：KX -Y + (x2y1 - x1y2)/(x2-x1) = 0
             * 设直线斜率为K = (y2-y1)/(x2-x1),C=(x2y1 - x1y2)/(x2-x1)
             * 点P(x0,y0)到直线AX + BY +C =0DE 距离为：d=|Ax0 + By0 + C|/sqrt(A*A + B*B)
             * 点（x3,y3）到经过点（x1,y1）和点（x2,y2）的直线的最短距离为：
             * distance = |K*x3 - y3 + C|/sqrt(K*K + 1)
             */
            /**
             * 计算点(node3)到线(node1,node2)的距离
             */
            getPointToLineLength:function(node1,node2,node3,isSegments){
                if (node1[0] == node2[0]){
                   return Math.abs(node3[0] - node1[0]);
                }
                if (node1[1] == node2[1]){
                   return Math.abs(node3[1] - node1[1]);
                }
                var lineK = (node2[1] - node1[1]) / (node2[0] - node1[0]);
                var lineC = (node2[0] * node1[1] - node1[0] * node2[1]) / (node2[0] - node1[0]);

                if(isSegments){
                    var tt = (lineK * node1[0] + node3[0] / lineK + node3[1] - node1[1]) / (1 / lineK + lineK)
                    var h =[
                        tt,
                        -1 / lineK * (tt - node3[0]) + node3[1]
                    ]
                    if(!this.isPointInSegments(node1,node2,h)){
                        return null;
                    }
                }
                return Math.abs(lineK * node3[0] - node3[1] + lineC) / (Math.sqrt(lineK * lineK + 1));
            },
            //获取一条边上指定宽度的路由器格式与坐标
            getLineCount:function(line,padding){
              var point=[],
                  dev = utils.getPointByPaddingDev(line[0],line[1],padding||10),
                  length = utils.getPointLength(line[0],line[1]),
                  count = Math.ceil(length/(padding||10));
                  for(var i = 1;i<count;i++){
                      point.push([line[0][0]*1+dev.devx*dev.devxsym*i,line[0][1]*1+dev.devy*dev.devysym*i]);
                  }
                  return {
                      count:count,
                      point:point,
                      length:length,
                      dev:dev
                  }
            },
            /**
             * 计算一条边上可以放多少个路由器
             */
            getLinesCount:function(lines,padding){
                var t=0,point= [];
                var self= this;
                lines.forEach(function(item){
                    // var n1 = item[0],
                    //     n2 = item[1],
                    //     dev = utils.getPointByPaddingDev(n1,n2,padding),
                    //     length = utils.getPointLength(n1,n2),

                    // count = Math.ceil(length/(padding||10))

                    // t+=(count-1);
                    // for(var i = 1;i<count;i++){
                    //     point.push([n1[0][0]*1+dev.devx*dev.devxsym*i,n1[0][1]*1+dev.devy*dev.devysym*i]);
                    // }
                    var o = self.getLineCount(item,padding);
                    point = point.concat(o.point);
                    t+=(o.count-1);
                });
                return {
                    count:t,
                    point:point
                }
            },
            //
            getPointByPaddingDev:function(node,node2,padding){
                var z = node2[0]-node[0];
                var c = node2[1]-node[1];
                if(node[0]==node2[0]){
                    return {
                        devx:0,
                        devy:Math.abs(node[1]-node2[1])/padding,
                        devxsym:1,
                        devysym:c>0?1:-1
                    }
                }
                if(node[1]==node2[1]){
                    return {
                        devx:Math.abs(node[0]-node2[0])/padding,
                        devy:0,
                        devxsym:z>0?1:-1,
                        devysym:1
                    }
                }
                var k = c/z;
                return {
                    devx : Math.abs(padding*Math.cos(Math.atan(k))),
                    devy : Math.abs(padding*Math.sin(Math.atan(k))),
                    devxsym:z>0?1:-1,
                    devysym:c>0?1:-1
                }

            }
       };
       utils.each([ "String", "Function", "Array", "Number", "RegExp", "Object", "Boolean" ], function(v) {
           utils["is" + v] = function typeCheck(obj) {
               return Object.prototype.toString.apply(obj) == "[object " + v + "]";
           };
       });
    return utils
})()
