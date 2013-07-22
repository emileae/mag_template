
    alert('no menu handler working!');

    $(document).on('touchstart', '.no_menu', function(){
        menu_active = false;
        alert(menu_active);
    });
    
    $(document).on('touchend', '.no_menu', function(){
        menu_active = true;
    });