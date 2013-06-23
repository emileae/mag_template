
var page1Scroll="";

$(document).ready(function(){//replaced with deviceready phonegap function

$('.page').on('backbutton',
     function(e){
         e.preventDefault();
});


//page0Scroll = new iScroll('wrapper_pg0', {hScrollbar: false, vScrollbar: true, lockDirection: true });
page1Scroll = new iScroll('wrapper_pg1', {hScrollbar: false, vScrollbar: true, lockDirection: true });
page1Scroll.refresh();
//page2Scroll = new iScroll('wrapper_pg2', {hScrollbar: false, vScrollbar: true, lockDirection: true });

/*SPRITESPIN*/
    
});


