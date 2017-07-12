var timer;
var $ = jQuery;
var isAnimating = false;
var changePageNow = false;
var loadedPages = new Array();

$(document).ready(function(){

    resizeWindow();

	$(window).resize(function() {
		resizeWindow();
	});

    function draw() {
        requestAnimationFrame(draw);
        scrollEvent();
    }
    draw();

    /*$(window).on('scroll',function(){
        if(!is_touch_device()){
            clearTimeout(timer);
            $('.scroll-cover').addClass('raise');

            timer = setTimeout(function(){
                $('.scroll-cover').removeClass('raise');
            },80);
        }
    });*/

});

function animTimeout(element,time){
    setTimeout(function(){ element.removeClass('anim-ready') },time);
}

function resizeWindow(){

    currentAnimOffset = parseInt($(window).height() * 0.1);

	screenWidth = $(window).width();
	screenHeight = $(window).height();

    $('.wrapper').css('width',screenWidth+'px');

    setContainerWidthHeight();



    // $('.page-cover').css('width', $(window).width()+'px').css('height', $(window).height()+'px');

}

function setContainerWidthHeight(){
    $('.page').each(function(){
        screenHeight = $(window).height();
        screenWidth = $(window).width();
        sliderElems = $(this).find('.slider, .masthead, .slide');
        spacer = $(this).find('img.spacer');
        if(spacer){

            clearTimeout(timer);
            sliderElems.addClass('instant-anim');

            if(42 + spacer.outerHeight() > screenHeight - 20){
                sliderElems.css('height',screenHeight - 62 + 'px');
            } else {
                if(screenWidth < 600){
                    sliderElems.css('height',screenHeight+'px').css('width',screenWidth+'px');
                    sliderElems.find('img.parallax').css('width','auto').css('height',screenHeight+'px').css('left','-50%');
                } else {
                    sliderElems.css('height',spacer.outerHeight()+'px').css('width','');
                    sliderElems.find('img.parallax').css('width','').css('height','').css('left','');
                }
            }

            timer = setTimeout(function(){
                sliderElems.removeClass('instant-anim');
            },80);
        }
    });
}


function initScrollEvent(){
    window.requestAnimationFrame(scrollEvent);
}

function is_touch_device() {
  return 'ontouchstart' in window // works on most browsers
      || 'onmsgesturechange' in window; // works on ie10
};

function scrollEvent(){

     /* if(!is_touch_device()){ */
        viewportTop = $(window).scrollTop();
        windowHeight = $(window).height();
        viewportBottom = windowHeight+viewportTop;

        // main parallax imaegs
        $('.slide img.parallax').each(function(){
            curClass = $(this).closest('.page').attr('class') || '';
            if(curClass.indexOf('oldpage') !=-1){ } else {
                scale = 1 + (viewportTop * 0.0002);
                if(scale < 1){ scale = 1; }
                scale = scale+0.01;
                distance = (viewportTop * 0.2) - 10;
                $(this).css('transform','scale3d('+scale+','+scale+',1) translate3d(0, '+ distance +'px,0)');
            }
        });

        // animate in whilst scrolling
        $('*[data-anim="true"]').each(function(){
            thisItemOffset = $(this).offset().top;
            thisRemoveItemOffset = 0;

            if( ($(window).height()+viewportTop) > thisItemOffset+currentAnimOffset  ){
                $(this).addClass('anim-in');
            } else {
                $(this).removeClass('anim-in');
            }
        });

        // parallax colours for 3 cols
        firstCircle = $(' .circle1');
        secondCircle = $(' .circle2');
        thirdCircle = $(' .circle3');
        windowThird = windowHeight / 3;

        if(firstCircle[0]){
            middlePoint = firstCircle.offset().top + ( firstCircle.outerHeight() / 2 );

            if(middlePoint > viewportTop && middlePoint < (viewportTop + windowThird) ){
                thirdCircle.addClass('active').parent().addClass('active');
            } else { thirdCircle.removeClass('active').parent().removeClass('active'); }

            if(middlePoint > (viewportTop + windowThird) && middlePoint < (viewportTop + (windowThird*2)) ) {
                secondCircle.addClass('active').parent().addClass('active');
            } else { secondCircle.removeClass('active').parent().removeClass('active'); }

            if(middlePoint > (viewportTop + (windowThird*2)) && middlePoint < (viewportTop + (windowThird*3) ) ) {
                firstCircle.addClass('active').parent().addClass('active');
            } else { firstCircle.removeClass('active').parent().removeClass('active'); }
        }
}
