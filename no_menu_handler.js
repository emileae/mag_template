
    $(document).on('touchstart mousedown', '.no_menu', function(){
        menu_active = false;
        alert(menu_active);
    });
    
    $(document).on('touchend mouseup', '.no_menu', function(){
        menu_active = true;
    });