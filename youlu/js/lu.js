window.onload = function () {
    // 背景移动
    $('.body-bg').mousemove(function (e) {
        var motion_rate = 0.07;
        var x = (e.screenX / $(window).width() - 0.5) * motion_rate;
        var y = (e.screenY / $(window).height() - 0.5) * motion_rate;
        $(this).css('background-position', (-x + 0.5) * 100 + '%' + (-y + 0.5) * 100 + "%");
    });
    // 翻页按钮
    function btn_scroll(){
        $(".btn-scroll").css("top",$(".road").offset().top)
        $(".btn-scroll").css("display",'block')
    }
    btn_scroll();
    $(window).resize(function () {
        btn_scroll();
    })
    $("#toright").click(function(){
        $(".road").scrollLeft($(".road").scrollLeft()+$(window).width()*0.5);
    })
    $("#toleft").click(function(){
        $(".road").scrollLeft($(".road").scrollLeft()-$(window).width()*0.5);
    })
};