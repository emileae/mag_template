$(document).ready(function(){
    
    var initial_btn_color = '#FFFF40';
    var touched_btn_color = '#A6A600';
    

    $('body').on('tap click', '#toc_icon_show', function (){
        show_tab();
    });
    
    $('body').on('touchstart mousedown', '.btn', function(){
        $(this).css('background-color', touched_btn_color);
    });
    
    $('body').on('touchend mouseup', '.btn', function(){
        $(this).css('background-color', initial_btn_color);
    });
    
    $('body').on('touchstart mousedown', '.article', function(){
        $(this).css('background-color', touched_btn_color);
    });
    
    $('body').on('touchend mouseup', '.article', function(){
        $(this).css('background-color', initial_btn_color);
    });
    
});