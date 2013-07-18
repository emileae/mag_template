$(window).load(function(){
    // Set height of all images after loaded
        
        
        
        $('img').load( function() {
            setTimeout(function(){
                $(this).css('height', $(this).height+'px');
            }, 0);
        });
        
        //var numImgs = $('img').length;
        //alert(numImgs);
    
});

function set_img_heights(){
    $('img').load( function() {
        setTimeout(function(){
            //alert($(this).height+'px');
            $(this).css('height', $(this).height+'px');
            pageScroll.refresh();
            pageScroll.scrollTo(0, 0, 200);
        }, 0);
    });
};