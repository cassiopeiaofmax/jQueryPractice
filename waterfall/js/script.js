$(function () {
    waterfall();
    var data = [{'src':'img/P_00.jpg'},{'src':'img/P_01.jpg'},{'src':'img/P_02.jpg'},{'src':'img/P_03.jpg'},{'src':'img/P_04.jpg'},{'src':'img/P_05.jpg'},{'src':'img/P_06.jpg'},{'src':'img/P_07.jpg'},{'src':'img/P_08.jpg'},{'src':'img/P_09.jpg'},{'src':'img/P_010.jpg'},{'src':'img/P_011.jpg'}];
    $(window).scroll(function(){
        if(update()){
            $(data).each(function () {
                var newbox = $('<div>').addClass('box').appendTo($('#main'));
                var newpic = $('<div>').addClass('pic').appendTo(newbox);
                $('<img>').attr('src', this.src).appendTo(newpic);
            });
            waterfall();
        }
    });
});

function waterfall() {
    var boxes = $('.box');
    var width = boxes.eq(0).outerWidth();
    var cols = Math.floor($(window).width()/width);
    //水平居中
    $('#main').width(width*cols).css('margin', '0 auto');

    var hArray = [];      //存放每列的高度
    //按位置摆放图片
    boxes.each(function (index, value) {
        var height = $(this).outerHeight();
        if(index<cols){     //第一行直接摆放
            hArray.push(height);
        }else{
            //计算出最低高度
            var hMin = Math.min.apply(null, hArray);
            //计算出哪列高度最低
            var minIndex = $.inArray(hMin, hArray);
            //图片摆放到相应位置
            $(this).css({
                'position': 'absolute',
                'top': hMin + 'px',
                'left': minIndex * width + 'px'
            });
            //更新数组元素
            hArray[minIndex] += height;
        }
    });
}

function update(){
    var lastEle = $('.box').last();
    var lastTop = lastEle.offset().top + Math.floor(lastEle.outerHeight()/2);
    var top = $(window).scrollTop() + $(document).width();
    return (lastTop < top)
}