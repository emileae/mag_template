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
            
            menu_active = false;
            
            var $img_popup = $(this).children('img_popup')
            var img = $img_popup.children('img')
            var width = img.width();
            var height = img.height();
            
            var $popup_scroll = $('#popup_scroll');
            var $scroller = $popup_scroll.children('.scroller');
            
            $popup_scroll.css('width',width);
            $popup_scroll.css('height',height);
            
            $scroller.css('width',width);
            $scroller.css('height',height);
            
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



