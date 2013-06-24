$(document).ready(function(){
    
    var toc_pos = $('#toc').position();
    var left_pos = toc_pos.left;
    left_pos = parseInt(left_pos);
    
    var x = document.getElementById("touchmove_track");
    x.innerHTML=left_pos;
    
    var initial_touchX = "";
    
    $(document).on('touchstart', onTouchStart);

    function onTouchStart( event ) {

        touchStartX = event.originalEvent.touches[0].clientX;
        /*touchStartY = event.originalEvent.touches[0].clientY;
        touchMoveX = null;
        touchMoveY = null;*/
        
        initial_touchX = touchStartX;

    }
    
    $(document).on('touchmove', onTouchMove);
    
    function onTouchMove( event ) {
        touchMoveX = event.originalEvent.touches[0].clientX;
        touchMoveY = event.originalEvent.touches[0].clientY;

        var x = document.getElementById("touchmove_track");
        x.innerHTML=touchMoveX;
        
        if (touchMoveX > initial_touchX && (touchMoveX-initial_touchX)>10){
            var new_left_pos = left_pos + (touchMoveX-initial_touchX);
            if ((touchMoveX-initial_touchX) > left_pos){
                new_left_pos = -left_pos;
            };
            x.innerHTML=new_left_pos;
            $('#toc').css('left', new_left_pos+'px');
        };

    }
    
    $(document).on('touchend', onTouchEnd);

    function onTouchEnd( event ) {
        
        initial_touchX = "";
        
        /*//window.unbindEvent( document, 'touchmove', onTouchMove );
        if( document.removeEventListener ) {
            document.removeEventListener( 'touchmove', onTouchMove, false );
        }
        else {
            document.detachEvent( 'on' + 'touchmove', onTouchMove );
        }

        // If there was no movement this was a tap
        if( touchMoveX === null && touchMoveY === null ) {
            console.log('tap');
        }*/
    }
    
    
    // ################## END  meny code  ###########
    
    var toc_shown = false;
    
    $('body').on('tap click', '#toc_icon', function(){
        show_tab();
    });
    
    $('body').on('tap click', '#toc_icon_hide', function(){
        hide_tab();
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
        toc_shown = true;
    };
    
    function hide_tab(){
        $('#toc').css('left', '-50%');
        $('#toc').css('-moz-transition', 'left 0.5s ease-in-out');
        $('#toc').css('-webkit-transition', 'left 0.5s ease-in-out');
        $('#toc').css('-o-transition', 'left 0.5s ease-in-out');
        $('#toc').css('transition', 'left 0.5s ease-in-out');
        toc_shown = false;
    };
    
    
    $('#toc_1').on('tap click', function(){
        setTimeout(function () {
        page1Scroll.scrollToElement('li:nth-child(1)', 100);
        }, 100);
        hide_tab();
        meny.close();
    });
    $('#toc_2').on('tap click', function(){
        setTimeout(function () {
        page1Scroll.scrollToElement('li:nth-child(2)', 100);
        }, 100);
        hide_tab();
        meny.close();
    });
    $('#toc_3').on('tap click', function(){
        setTimeout(function () {
        page1Scroll.scrollToElement('li:nth-child(3)', 100);
        }, 100);
        hide_tab();
        meny.close();
    });


});