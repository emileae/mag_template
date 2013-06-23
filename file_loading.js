$(document).ready(function(){
    
    var num_pages = 13;
    for (var i = 0; i < num_pages; i++) {
        var html_to_append = req_page(i);
        $('#wrapper_pg'+i).html(html_to_append);
        console.log('#wrapper_pg'+i);
    };

});


// XML HttpRequest Function(s)
function req_page(page_no){
    var request = new XMLHttpRequest();
    
    var response_html = 'error'
    
    request.open("GET", page_no+'.html', false);/* changed to async = false */
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                response_html = request.responseText;
            }
        }
    };
        request.send();
        return response_html
};

function req(file_name){
    var request = new XMLHttpRequest();
    
    var response_html = 'error'
    
    request.open("GET", file_name, false);/* changed to async = false */
    request.onreadystatechange = function(){
        if (request.readyState == 4) {
            if (request.status == 200 || request.status == 0) {
                //console.log("response " + request.responseText);
                response_html = request.responseText;
            }
        }
    };
        request.send();
        return response_html
};