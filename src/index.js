require.config({
        // RequireJS 通过一个相对的路径 baseUrl来加载所有代码。baseUrl通常被设置成data-main属性指定脚本的同级目录。
        // baseUrl:"",
        // 第三方脚本模块的别名,jquery比libs/jquery-1.11.1.min.js简洁明了；
        paths: {
            // "jquery" 	: "../lib/bower/jquery/dist/jquery.min",
            "echarts"	: "../lib/echarts.min"
        }

    });
require(["wireless",'option'], function (wireless,option) {
    $('#content-wrapper').delegate('form,button', 'submit', function(e) {
        e.stopPropagation();
        return false;
    });
    // $(".start").click(function(){
    //     // $(".play").addClass('sub');
    //     // $(this).hide();
    //     // $("")
    //     $("#paramds-modal").modal('show');
    // });
    $("#run").click(function(e){
        if(wireless.isResult&&!confirm("已经存在结果是否清空")){
            return ;
        }
        wireless.play($("#numbers").val()||5,$("#bout").val()||10);
        //$("#paramds-modal").modal('hide');
    });
    $("#padding").on('input',function(){
        if($(this).val())
            option.setDefaultOptions('route-padding',$(this).val());

    });
});
