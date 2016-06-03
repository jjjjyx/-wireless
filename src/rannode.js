define(function(){
	return {
		rand:function(numbers,bout){
			var node = [];
			for(var i = 1;i<=numbers;i++){
				//node.push(new Edge());
				//node.push(new Point(i+1,Math.round(Math.random() * 1000 + i),Math.round(Math.random() * 1000 + i)));
				node.push({
					value:[Math.round(Math.random() * 1000 - i),Math.round(Math.random() * 1000 - i)],
					id:i,
					name:i,
					symbol:'circle',
					symbolSize:10
				});
			}
			return node;
		}
	}
});
