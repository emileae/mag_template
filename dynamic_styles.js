$(document).ready(function(){
    
    //more styles for img_container set in styles.css
    
    /**/
    $('.cover').css('width', $(window).width());
    $('.cover').css('height', $(window).height());
    
    /*$('.body').on('touchstart mousedown', '.button', function(){
        alert('touchstart');
        $('.button').css('background-color', '#BAB791');
    });
    $('.body').on('touchend mouseup', '.button', function(){
        alert('touchend');
        $('.button').css('background-color', '#949068');
    });*/
    
    $('body').on('mousedown touchstart', '.close_x', function(){
        $('.close_x').css('background-position', '0px -20px');
    });
    $('body').on('mouseup touchend', '.close_x', function(){
        $('.close_x').css('background-position', '0px 0px');
    });
    
});