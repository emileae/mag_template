$(document).ready(function(){
    
    var initial_btn_color = '#2E2E26';
    var touched_btn_color = '#6B6B55';
    

    $('body').on('tap click', '#toc_icon_show', function (){
        show_tab();
    });
    
    $('body').on('touchstart mousedown', '.btn', function(){
        $(this).css('color', touched_btn_color);
    });
    
    $('body').on('touchend mouseup', '.btn', function(){
        $(this).css('color', initial_btn_color);
    });
    
    $('body').on('touchstart mousedown', '.article', function(){
        $(this).css('color', touched_btn_color);
    });
    
    $('body').on('touchend mouseup', '.article', function(){
        $(this).css('color', initial_btn_color);
    });
    
});