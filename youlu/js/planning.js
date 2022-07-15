window.onload = function () {
    // 背景移动
    $('.body-bg').mousemove(function (e) {
      var motion_rate = 0.07;
      var x = (e.screenX / $(window).width() - 0.5) * motion_rate;
      var y = (e.screenY / $(window).height() - 0.5) * motion_rate;
      $(this).css('background-position', (-x + 0.5) * 100 + '%' + (-y + 0.5) * 100 + "%");
    });
    // 按钮显示
    $(window).scroll(function () {
      if ($(document).scrollTop() >= $(".navbar").height()) {
        $(".btn-page").css("opacity", "100%");
        $(".btn-page").css("pointer-events", "auto");
      } else {
        $(".btn-page").css("opacity", "0%");
        $(".btn-page").css("pointer-events", "none");
      }
    });
    // 开关动效
    $(".card-switch").bind("click", function (e) {
      var switch_x = e.pageX - $(this).offset().left - $(this).width() / 2;
      if (switch_x >= 0) {
        $(this).find(".choice").prop("checked", true)
      } else {
        $(this).find(".choice").prop("checked", false)
      };
      if ($(this).find('.choice').is(":checked")) {
        var choice = true;
        $(this).find('label').find('span').css("background-color","#D1DFFF");
        $(this).css("background-color", "#6D9AFF")
        $(this).find('.choice_2').css("font-size", "3.5vw")
        $(this).find('.choice_2').css("font-weight", "900")
        // $(this).find('.choice_2').css("opacity", "0.9")
        $(this).find('.choice_1').css("font-size", "1.5vw")
        $(this).find('.choice_1').css("font-weight", "300")
        // $(this).find('.choice_1').css("opacity", "0.6")
      } else {
        var choice = false;
        $(this).find('label').find('span').css("background-color","#FBDED5");
        $(this).css("background-color", "#EF7D56")
        $(this).find('.choice_2').css("font-size", "1.5vw")
        $(this).find('.choice_2').css("font-weight", "300")
        $(this).find('.choice_2').css("opacity", "0.6")
        $(this).find('.choice_1').css("font-size", "3.5vw")
        $(this).find('.choice_1').css("font-weight", "900")
        $(this).find('.choice_1').css("opacity", "0.9")
      };
    })
    $(".card-switch").mousemove(function (e) {
      var switch_x = e.pageX - $(this).offset().left - $(this).width() / 2;
      if (switch_x >= 0) {
        $(this).find('.choice_2').css("opacity", "1")
        $(this).find('.choice_1').css("opacity", "0.4")
      } else {
        $(this).find('.choice_2').css("opacity", "0.4")
        $(this).find('.choice_1').css("opacity", "1")
      };
    });
    $(".card-switch").mouseout(function () {
      $(this).find('.choice_2').css("opacity", "0.7")
      $(this).find('.choice_1').css("opacity", "0.7")
    });

    // 翻页
    var page = 1;
    function pageTran() {
      console.log(page);
      if (page == 1) {
        $("#btn-next").fadeIn(500);
        $("#btn-back").fadeOut(500);
        $('.job').fadeOut(500, function () {
        $('.info').fadeOut(500,function(){
          $('.interest').fadeIn(500);
        })
        });
        $('.steps-first').css("background-color", "#3A745F");
        $('.steps-middle').css("background-color", "#B4AA99");
        $('.steps-last').css("background-color", "#B4AA99");
      } else if (page == 2) {
        $("#btn-back").fadeIn(500);
        $("#btn-next").fadeIn(500);
        $('.job').fadeOut(500, function () {
        $('.interest').fadeOut(500,function(){
          $('.info').fadeIn(500);
        });
        });
        $('.steps-first').css("background-color", "#B4AA99");
        $('.steps-middle').css("background-color", "#3A745F");
        $('.steps-last').css("background-color", "#B4AA99");
      } else {
        $("#btn-back").fadeIn(500);
        $("#btn-next").fadeOut(500);
        $('.interest').fadeOut(500, function () {
        $('.info').fadeOut(500,function(){
          $('.job').fadeIn(500);
        });
        });
        $('.steps-first').css("background-color", "#B4AA99");
        $('.steps-middle').css("background-color", "#B4AA99");
        $('.steps-last').css("background-color", "#3A745F");
      }
    }
    function pageNext() {
      page = page+1;
      pageTran();
      console.log(page);
    };
    function pageBack() {
      page = page-1;
      pageTran();
    };

    $(".steps").click(function () {
      page = Number($(this).attr("value"));
      pageTran();
    });

    $("#btn-next").click(pageNext);
    $("#btn-back").click(pageBack);

  };