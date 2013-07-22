$(document).ready(function(){
    $(document).on('touchstart', '.no_menu', function(){
        menu_active = false;
    });
    
    $(document).on('touchend', '.no_menu', function(){
        menu_active = true;
    });
    
});