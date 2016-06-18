
var express = require('express'),  
    app = express(), 
    path = require('path') 
    server = require('http').createServer(app),
    ran = require('./rannode'),
    utils = require('./utils'),
	map={
    	ch 	:require('./CH.graham'),
	    com:require('./COM'),
	    mst :require('./MST')
    };

    app.use(express.static(path.join(__dirname, './')));
    app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8");
	    next();
	});
    // var result = {code:0};
    app.get('/', function (req, res) {
    	res.sendfile('./index.html');
	})
	app.get('/utils/getLineCount', function (req, res) {
    	try{
			if(req.query.line){
				var line = JSON.parse(req.query.line);
				if(dataV(line)){
					res.json({code:0,data:utils.getLineCount(line,req.query.padding)});
				}
		   	}
	   	}catch(e){
	   		console.log(e);
	   	}
	   res.json({code:-1,msg:"参数不正确"});
	})
	app.get('/utils/getLinesCount', function (req, res) {
    	try{
			if(req.query.line){
				var line = JSON.parse(req.query.line);
				if(utils.isArray(line)){
					var aa =line.find(function(item){
						return !dataV(item);
					})
					console.log(aa);
					if(!aa){
						res.json({code:0,data:utils.getLinesCount(line,req.query.padding)});
					}
				}
		   	}
	   	}catch(e){
	   		console.log(e);
	   	}
	   res.json({code:-1,msg:"参数不正确"});
	})
	app.get('/path/:id', function (req, res) {
		try{
			if(req.query.node){
				var node = JSON.parse(req.query.node);
				if(dataV(node)&&map[req.params.id]){
					res.json({code:0,data:map[req.params.id].exec(node)})	
				}
		   	}
	   	}catch(e){
	   		// console.log(e);
	   	}
	   res.json({code:-1,msg:"参数不正确"});
	})

server.listen(3021,function(){
	console.log('127.0.0.1:3021');
});
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    enumerable: false,
    configurable: true,
    writable: true,
    value: function(predicate) {
      if (this == null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        if (i in list) {
          value = list[i];
          if (predicate.call(thisArg, value, i, list)) {
            return value;
          }
        }
      }
      return undefined;
    }
  });
}

function dataV(node){
	var reg = /^[1-9]?[0-9]*[\.[0-9]*]?$/;
	if(utils.isArray(node)){
		return !node.find(function(item){
			return !(utils.isArray(item)&&reg.test(item[0])&&reg.test(item[1]))
		});
		
	}else return false;
}
