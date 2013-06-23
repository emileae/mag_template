//use a callback function on load

$(document).ready(function(){
    
    var images = [{'id':'img_2_pg_5', 'width':'300px', 'height':'300px'}];
    
    for (var i=0; i<images.length; i++){
        $('#'+images[i]['id']).css('width', images[i]['width']);
        $('#'+images[i]['id']).css('height', images[i]['height']);
        console.log(images[i]['width']);
    };
    
});


/*
$(document).ready(function(){
    
    $('.set_height').css('height', child_height($(this)));
    $('.set_height').css('width', child_width());
    
});

function child_height($item){
    
    var height = $item.children().attr('height');
    return height
    
};

function child_width($item){
    
    var width = $item.children().attr('width');
    return width
    
};

*/
