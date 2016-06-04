define(function(){
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
           /**
            * @method paralle()
            * @for jyx.Utils
            * @grammar paralle() => {Any}
            *
            * @description 平行地对 v1 和 v2 进行指定的操作
            *
            *    如果 v1 是数字，那么直接进行 op 操作
            *    如果 v1 是对象，那么返回一个对象，其元素是 v1 和 v2 同键值的每个元素平行地进行 op 操作的结果
            *    如果 v1 是数组，那么返回一个数组，其元素是 v1 和 v2 同索引的每个元素平行地进行 op 操作的结果
            *
            * @param  {Number|Object|Array} v1 第一个操作数
            * @param  {Number|Object|Array} v2 第二个操作数
            * @param  {Function} op 操作函数
            *
            *
            *
            * @example
            *
            * ```js
            * var a = {
            *     value1: 1,
            *     value2: 2,
            *     value3: [3, 4, 5]
            * };
            *
            * var b = {
            *     value1: 2,
            *     value2: 3,
            *     value3: [4, 5, 6]
            * };
            *
            * var c = jyx.Utils.paralle(a, b, function(v1, v2) {
            *     return v1 + v2;
            * });
            *
            * console.log(c.value1); // 3
            * console.log(c.value2); // 5
            * console.log(c.value3); // [7, 9, 11]
            *
            * ```
            */
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
            /****点到直线的距离***
             * 过点（x1,y1）和点（x2,y2）的直线方程为：KX -Y + (x2y1 - x1y2)/(x2-x1) = 0
             * 设直线斜率为K = (y2-y1)/(x2-x1),C=(x2y1 - x1y2)/(x2-x1)
             * 点P(x0,y0)到直线AX + BY +C =0DE 距离为：d=|Ax0 + By0 + C|/sqrt(A*A + B*B)
             * 点（x3,y3）到经过点（x1,y1）和点（x2,y2）的直线的最短距离为：
             * distance = |K*x3 - y3 + C|/sqrt(K*K + 1)
             */
            /**
    		 * 计算点到线的距离
    		 */
            getPointToLineLength:function(node1,node2,node3){
                if (node1[0] == node2[0]){
                   return Math.abs(node3[0] - node1[0]);
                }
                if (node1[1] == node2[1]){
                   return Math.abs(node3[1] - node1[1]);
                }
                var lineK = (node2[1] - node1[1]) / (node2[0] - node1[0]);
                var lineC = (node2[0] * node1[1] - node1[0] * node2[1]) / (node2[0] - node1[0]);
                console.log( (Math.sqrt(lineK * lineK + 1)));
                console.log(Math.abs(lineK * node3[0] - node3[1] + lineC)+"%c","color:red");
                if(Math.abs(lineK * node3[0] - node3[1] + lineC)==0)
                    console.log(111);
                return Math.abs(lineK * node3[0] - node3[1] + lineC) / (Math.sqrt(lineK * lineK + 1));
            },
            getLinesLength:function(lines,padding){
                var t=0,point= [];
                lines.forEach(function(item){
                    var n1 = item[0].coord,
                        n2 = item[1].coord,
                        dev = utils.getPointByPaddingDev(n1,n2,padding),
                        length = utils.getPointLength(n1,n2),

                    count = Math.ceil(length/(padding||10))
                    if(!dev){
                        console.log(lines);
                        console.log(item);
                    }

                    t+=(count-1);
                    for(var i = 1;i<count;i++){
                        point.push({
                            coord:[n1[0]+dev.devx*dev.devxsym*i,n1[1]+dev.devy*dev.devysym*i],
                            name:"路由",

                        });
                    }
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
       /**
        * @method isString()
        * @for jyx.Utils
        * @grammar isString(unknown) => {boolean}
        * @description 判断一个值是否为字符串类型
        * @param  {any} unknown 要判断的值
        */
           /**
        * @method isFunction()
        * @for jyx.Utils
        * @grammar isFunction(unknown) => {boolean}
        * @description 判断一个值是否为函数类型
        * @param  {any} unknown 要判断的值
        */
           /**
        * @method isArray()
        * @for jyx.Utils
        * @grammar isArray(unknown) => {boolean}
        * @description 判断一个值是否为数组类型
        * @param  {any} unknown 要判断的值
        */
           /**
        * @method isNumber()
        * @for jyx.Utils
        * @grammar isNumber(unknown) => {boolean}
        * @description 判断一个值是否为数字类型
        * @param  {any} unknown 要判断的值
        */
           /**
        * @method isRegExp()
        * @for jyx.Utils
        * @grammar isRegExp(unknown) => {boolean}
        * @description 判断一个值是否为正则表达式类型
        * @param  {any} unknown 要判断的值
        */
           /**
        * @method isObject()
        * @for jyx.Utils
        * @grammar isObject(unknown) => {boolean}
        * @description 判断一个值是否为对象类型
        * @param  {any} unknown 要判断的值
        */
           /**
        * @method isBoolean()
        * @for jyx.Utils
        * @grammar isBoolean(unknown) => {boolean}
        * @description 判断一个值是否为布尔类型
        * @param  {any} unknown 要判断的值
        */
       utils.each([ "String", "Function", "Array", "Number", "RegExp", "Object", "Boolean" ], function(v) {
           utils["is" + v] = function typeCheck(obj) {
               return Object.prototype.toString.apply(obj) == "[object " + v + "]";
           };
       });
       window.utils = utils;
    return utils
});



/**
 * node 点
 * 距离
 */
//getPointByPadding:function(node,node2,padding){
    //(y-y1)/(y2-y1)=(x-x1)/(x2-x1)
    // z = (x2-x1)
    // c = (y2-y1)
    // z * (y-y1) = c * (x-x1)
    // z*y - z*y1 = c*x - c*x1
    // z*y - c*x - z*y1 + c*x1 = 0
    // k = - c/z
    // if(node[0]!=node2[0]&&node[1]!=node2[1]){
    //     var z = node2[0]-node[0];
    //     var c = node2[1]-node[1];
    //     // var o = c*node[0] - z * node[1];
    //     var k = c/z;
    //     var devx = padding*Math.cos(Math.atan(k)*180/Math.PI)
    //     var devy = padding*Math.sin(Math.atan(k)*180/Math.PI)
    //     var newnode = [];
    //     var sym = 1;
    //     z>0  ? sym = 1 :sym = -1;
    //     newnode.push(node[0]+devx*sym)
    //     c>0  ? sym = 1 :sym = -1;
    //     newnode.push(node[1]+devy*sym)
    //     return newnode;
    // }

    // if(node[0]!=node2[0]&&node[1]!=node2[1]){
    //     var k = -0;
    // }
    // var tanangle = Math.atan();
//},
