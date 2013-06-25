$(document).ready(function(){
    
    var toc_pos = $('#toc').position();
    var current_pos = toc_pos.left;
    var initial_left_pos = toc_pos.left;
    current_pos = parseInt(current_pos);
    initial_left_pos = parseInt(initial_left_pos);
    
    var swipe_direction = "";
    
    var menu_pos = "closed";
    
    //var x = document.getElementById("touchmove_track");
    //x.innerHTML=current_pos;
    
    var initial_touchX = "";
    var initial_touchY = "";
    
    $(document).on('touchstart', onTouchStart);
    $(document).on('touchmove', onTouchMove);
    $(document).on('touchend', onTouchEnd);

    function onTouchStart( event ) {

        touchStartX = event.originalEvent.touches[0].clientX;
        touchStartY = event.originalEvent.touches[0].clientY;
        
        initial_touchX = touchStartX;
        initial_touchY = touchStartY;
        //x.innerHTML=touchStartX;
    };
    
    function onTouchMove( event ) {
        touchMoveX = event.originalEvent.touches[0].clientX;
        touchMoveY = event.originalEvent.touches[0].clientY;

        //var x = document.getElementById("touchmove_track");
        
        var diff = touchMoveX - initial_touchX;
        var diffY = Math.abs(touchMoveY - initial_touchY);
        
        if (diff > 0 && diff > 20 && diffY < 20){
            swipe_direction = 'right';
            if (menu_pos == "closed"){
                show_tab();
                menu_pos = "open";
            };
        }else if (diff < 0 && diff < -20 && diffY < 20){
            swipe_direction = 'left';
            if (menu_pos == "open"){
                hide_tab();
                menu_pos = "closed";
            };
        }else if (diff == 0){
            swipe_direction = 'tap';
        };

    };

    function onTouchEnd( event ) {
        
        initial_touchX = "";
        initial_touchY = "";
    }
    
    
    // ################## END  meny code  ###########
    
    var toc_shown = false;
    
    $('body').on('tap click', '#toc_icon', function(){
        show_tab();
       // menu_pos == "open"
    });
    
    $('body').on('tap click', '#toc_icon_hide', function(){
        hide_tab();
        //menu_pos == "closed"
    });
    
    $('body').on('click',function(){
        if (toc_shown){
            //alert('!!');
            //hide_tab();
        };
    });
    
    function show_tab(){
        $('#toc').css('left', '0%');
        $('#toc').css('-moz-transition', 'left 0.5s ease-in-out');
        $('#toc').css('-webkit-transition', 'left 0.5s ease-in-out');
        $('#toc').css('-o-transition', 'left 0.5s ease-in-out');
        $('#toc').css('transition', 'left 0.5s ease-in-out');
        
        $('body').append('<div id="full_overlay"></div>');
        menu_pos == "open";
        toc_shown = true;
        current_pos = 0;
    };
    
    function hide_tab(){
        $('#toc').css('left', '-50%');
        $('#toc').css('-moz-transition', 'left 0.5s ease-in-out');
        $('#toc').css('-webkit-transition', 'left 0.5s ease-in-out');
        $('#toc').css('-o-transition', 'left 0.5s ease-in-out');
        $('#toc').css('transition', 'left 0.5s ease-in-out');
        
        $('#full_overlay').remove();
        menu_pos == "closed";
        toc_shown = false;
        current_pos = initial_left_pos;
    };
    
    
    $('#toc_1').on('tap click', function(){
        setTimeout(function () {
        page1Scroll.scrollToElement('li:nth-child(1)', 100);
        }, 100);
        hide_tab();
        //meny.close();
    });
    $('#toc_2').on('tap click', function(){
        setTimeout(function () {
        page1Scroll.scrollToElement('li:nth-child(2)', 100);
        }, 100);
        hide_tab();
        //meny.close();
    });
    $('#toc_3').on('tap click', function(){
        setTimeout(function () {
        page1Scroll.scrollToElement('li:nth-child(3)', 100);
        }, 100);
        hide_tab();
        //meny.close();
    });


});