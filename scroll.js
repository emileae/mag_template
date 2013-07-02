
var page1Scroll="";

$(document).ready(function(){//replaced with deviceready phonegap function

$('.page').on('backbutton',
     function(e){
         e.preventDefault();
});

if ($('.page').length){
    pageScroll = new iScroll('wrapper_pg', {hScrollbar: false, vScrollbar: true, lockDirection: true });
};


/*
var numPages = $('.page').length;
alert(numPages);

var pages = [];

for(var i = 0; i < numPages; i++){
    page[i] = new iScroll('wrapper_pg'+i+'', {hScrollbar: false, vScrollbar: true, lockDirection: true });
};

//page0Scroll = new iScroll('wrapper_pg0', {hScrollbar: false, vScrollbar: true, lockDirection: true });
//page1Scroll = new iScroll('wrapper_pg1', {hScrollbar: false, vScrollbar: true, lockDirection: true });
//page1Scroll.refresh();
//page2Scroll = new iScroll('wrapper_pg2', {hScrollbar: false, vScrollbar: true, lockDirection: true });
*/

/*SPRITESPIN*/
    
});


