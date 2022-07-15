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
    }
  });



  // <!-- chart3 -->

  var chart = c3.generate({
    bindto: '#chart3',
    data: {
        x: 'x',
        columns: [
            ['x', '2017-01-01', '2018-01-02', '2019-01-03', '2020-01-04', '2021-01-05', '2022-01-06'],
            ['高中及以下', 13, 12, 18, 12, 12, 15],
            ['本科', 47, 50, 53, 43, 52, 55],
            ['硕士', 28, 25, 19, 27, 22, 19],
            ['博士', 12, 13, 17, 12, 14, 11]
        ],
        type: 'bar',
        labels: true
    },
    axis: {
      y: {
        label: '%'
      },
        x: {
            type: 'timeseries',
            tick: {
                format: '%Y'
            }
        },
    },
    grid: {
      x: {
          show: true
      },
      y: {
          show: true
      }
    }
});


  // <!-- chart4 -->

  var chart4 = c3.generate({
    bindto: '#chart4',
    data: {
      x:'x', 
      columns: [
        ['x','2020-01-04', '2021-01-05', '2022-01-06'],
        ['头部薪资', 18000, 21000, 24000],
        ['平均薪资', 12000, 13700, 14500],
        ['入行薪资', 5500, 5700, 6000]
      ],
      labels: true
    },
    axis: {
      y: {
        label: '元'
      },
      x: {
            type: 'timeseries',
            tick: {
                format: '%Y'
            }
        }
    }
  });


  // <!-- chart5 -->

  var chart5 = c3.generate({
    bindto: '#chart5',
    data: {
      x:"x",
      columns: [
        ['x', '2017-01-01', '2018-01-02', '2019-01-03', '2020-01-04', '2021-01-05', '2022-01-06'],
        ['应届岗位数量', 3700, 4600, 4200, 4000, 4500]
      ],
      labels: true
    },
    axis: {
      x: {
        type: 'timeseries',
            tick: {
                format: '%Y'
            }
      }
    },
    grid: {
      y: {
          lines: [
              {value: 4200, text: '近五年平均岗位量'},
          ]
      }
    },
    legend: {
      show: false
    }
  })