define(['utils'],function(utils){
    var _options = {
        'route-padding':100
    }
    return {
        getOptions: function(key) {
            if (key) {
                return _options[key];
            }
        },
        setDefaultOptions: function(key, val, cover) {
            var obj = {};
            if (utils.isString(key)) {
                obj[key] = val;
            } else {
                obj = key;
            }
            $.extend(_options, obj);
        }
    }
});
