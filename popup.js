$(document).ready(function(){
    
    $('body').on('touchend mouseup', '.popup_trigger', function(){
        var content = $(this).children('.popup').html();
        
        if($(this).children('.popup').hasClass('mkScroll')){
            $('body').append('<div id="full_overlay"></div>\
                <div id="overlay_content">\
                    <div class="close_x_wrapper">\
                        <div class="close_x"></div>\
                    </div>\
                    <div id="popup_scroll" class="scrollWrapper">\
                        <div class="scroller">\
                            '+content+'\
                        </div>\
                    </div>\
                </div>\
            ');
            
            popupScroll = new iScroll('popup_scroll', {hScrollbar: false, vScrollbar: true, lockDirection: true });
            
        }else if($(this).children('.popup').hasClass('img_popup')){
            $('body').append('<div id="full_overlay"></div>\
                <div id="overlay_content">\
                    <div class="close_x_wrapper">\
                        <div class="close_x"></div>\
                    </div>\
                    <div id="popup_scroll" class="scrollWrapper">\
                        <div class="scroller">\
                            '+content+'\
                        </div>\
                    </div>\
                </div>\
            ');
            
            //this sets the img width to 100%
            var $popupscroll = $('#popup_scroll');
            var $scroller = $popupscroll.children('.scroller');
            var $img = $scroller.children('img');
            
            $img.css('width', '90%');
            alert($img.height());
            var div_height = ($img.height())+20;
            $('#overlay_content').css('height', div_height+'px');
            $('#overlay_content').css('padding-top', '10px');
            $('#overlay_content').css('padding-bottom', '10px');
            $('#overlay_content').css('padding-left', '5%');
            $('#overlay_content').css('padding-right', '5%');
            
            menu_active = false;
            
            imgScroll = new iScroll('popup_scroll', {hScrollbar: false, vScrollbar: false,  zoom: true, zoomMax: 10 });
            
        }else{
            $('body').append('<div id="full_overlay"></div>\
                <div id="overlay_content">\
                <div class="close_x_wrapper"><div class="close_x"></div></div>\
                    '+content+'\
                </div>\
            ');
        };
    });
    
    
    
    $('body').on('tap click', '#full_overlay', function(){
        $('#full_overlay').remove();
        $('#overlay_content').remove();
        menu_active = true;
        popupScroll.destroy();
        popupScroll = null;
        imgScroll.destroy();
        imgScroll = null;
    });
    $('body').on('tap click', '.close_x', function(){
        $('#full_overlay').remove();
        $('#overlay_content').remove();
        menu_active = true;
        popupScroll.destroy();
        popupScroll = null;
        imgScroll.destroy();
        imgScroll = null;
    });
    
});

function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
};



