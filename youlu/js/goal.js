    // 背景移动
    $('.body-bg').mousemove(function (e) {
        var motion_rate = 0.07;
        var x = (e.screenX / $(window).width() - 0.5) * motion_rate;
        var y = (e.screenY / $(window).height() - 0.5) * motion_rate;
        $(this).css('background-position', (-x + 0.5) * 100 + '%' + (-y + 0.5) * 100 + "%");
      });
  
      // 固定（fixed类）
      var fix_height = $(".fixed").offset().top;
      $(window).scroll(function () {
        if ($(document).scrollTop() >= fix_height) {
          $(".fixed").css("transform", "translateY(" + ($(document).scrollTop() - fix_height + 20) + "px)");
        } else {
          $(".fixed").css("transform", "none");
        };
        if ($(document).scrollTop() >= ($(document).height() -$(window).height() - $(".footer").height())) {
            $(".back-to-top").css("background", "#374B43");
        }else if($(document).scrollTop() > $(".nav").height() * 1.5 ){
            $(".back-to-top").css("background", "#3A745F");
            $(".back-to-top").css("visibility", "visible");
            $(".back-to-top").css("opacity", "1");
        }else {
            $(".back-to-top").css("visibility", "hidden");
            $(".back-to-top").css("opacity", "0");
        };
      });
  
      // 从业者占比图表
      var chart_1 = c3.generate({
        bindto: '#chart_1',
        data: {
          columns: [
            ['相关专业本科', 30],
            ['相关专业硕士', 60],
            ['相关专业博士', 14],
            ['其他专业', 65],
          ],
          type: 'pie',
          onclick: function (d, i) { console.log("onclick", d, i); },
          onmouseover: function (d, i) { console.log("onmouseover", d, i); },
          onmouseout: function (d, i) { console.log("onmouseout", d, i); }
        },
        size: {
          'height': 280
        }
      });