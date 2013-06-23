$(window).load(function(){
    // Set height of all images after loaded
        
        
        
        $('img').load( function() {
            setTimeout(function(){
                $(this).css('height', $(this).height+'px');
            }, 0);
        });
        
        //var numImgs = $('img').length;
        //alert(numImgs);
        
        myScroll.refresh();
        page1Scroll.refresh();
        page2Scroll.refresh();
        page3Scroll.refresh();
        page4Scroll.refresh();
        page5Scroll.refresh();
        page6Scroll.refresh();
        page7Scroll.refresh();
        page8Scroll.refresh();
        page9Scroll.refresh();
        page10Scroll.refresh();
        page11Scroll.refresh();
        page12Scroll.refresh();
    
});