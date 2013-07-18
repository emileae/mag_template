// -- downloading files based on a file list that is requested from an external server and storing files on device for later viewing

//Global instance of DirectoryEntry for our data
var DATADIR;
var fetched_datadir;
var article_name;
var issue_dir;
var knownfiles = []; 
var filename = "";
var foldername = "";
var setting_issue_list = false;
var no_connection = false;

// START FETCH DATADIR FUNCTION

function render_article(articlename){
    //alert('try to render');
    //alert(localStorage.downloaded);
    article_name = articlename;
    DATADIR.getFile(article_name, {}, gotFileEntry_new, onError_test_2);
};

function gotFileEntry_new(fileEntry) {
    fileEntry.file(gotFile_new, onError_test_2);
};

function gotFile_new(file){
    readAsText_new(file);
};

function readAsText_new(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        
        $('#content').html(evt.target.result);
        set_img_heights();
        pageScroll.refresh();
        pageScroll.scrollTo(0, 0, 200);
        
        //setting the src url for all images
        var imgs = document.getElementsByTagName("img");
        
        for(var i = 0; i < imgs.length; i++){
           var file_name = imgs[i].getAttribute('id');
           imgs[i].src = DATADIR.fullPath+'/'+file_name;
           // close_menu();
        };
        
        close_menu();
        
    };
    reader.readAsText(file);
};






// END FETCH DATADIR FUNCTION



//A ton of callback function needed to store files on sd card persistent storage on device
function onFSSuccess(fileSystem) {
    //alert('find or create Directory'+'-'+foldername);
    //fileSystem.root.getDirectory("Android/data/magtemplate.com.scknss.www",{create:true, exclusive: false}, function(appID){
    fileSystem.root.getDirectory("magtemplate.com.scknss.www",{create:true, exclusive: false}, function(appID){
        appID.getDirectory(foldername, {create: true, exclusive: false}, madeDir, onError_test_2)
    },onError_test_1);
};

function madeDir(d){
    //alert('found/made Directory'+'-'+foldername);
    DATADIR = d;
    var reader = DATADIR.createReader();
    reader.readEntries(function(d){
        //alert('done with dirs'+'-'+foldername);
        gotFileEntries(d);
    },onError_test);
};

function gotFileEntries(fileEntries) {
    //alert("The dir has "+fileEntries.length+" entries."+'-'+foldername);
    
    if (localStorage.downloaded){
            var str = localStorage.downloaded;
            var n = str.split(",");
            var i_string = foldername.toString();
            var in_array = $.inArray(i_string,n);
            //alert(in_array);
            if (in_array > -1){
                render_issue(foldername);
            }else{
                download_issue_files(foldername);
            };
        }else{
            download_issue_files(foldername);
        };
    
};


function onError(e){
    alert("ERROR");
    //alert(e.target.error.code);
    //alert(JSON.stringify(e));
};
function onError_test(e){
    alert("ERROR TEST");
};
function onError_test_1(e){
    alert("ERROR TEST 1");
};
function onError_test_2(e){
    alert("ERROR TEST 2");
};
function onError_test_3(e){
    alert("ERROR TEST 3");
};
function onError_test_4(e){
    alert("ERROR TEST 4");
};
function onError_test_5(e){
    alert("ERROR TEST 5");
};
function onError_test_6(e){
    var str = localStorage.downloaded;
    var n = str.split(",");
    var i_string = foldername.toString();
    var index = n.indexOf(i_string);
    n.splice(index, 1);
    localStorage.downloaded = "";
    for (var i=0; n.length; i++){
        var elem = n[i];
        localStorage.downloaded = localStorage.downloaded+','+elem
    };
    set_issue_list();
    //alert("ERROR TEST 6");
};

function onDeviceReady() {
    get_issue_list_handler ()
};

function download_handler(issue){
    //alert('download handler'+issue);
    foldername = issue;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, null);
};

function download_issue_files(issue){
    //alert('getting file dict to download');
    $('#issue_'+issue).html('Loading');
    $.get("http://eaeissues.appspot.com/getfilelist/"+issue+"", {}, function(data) {
        //function(data){returns list of files to download}
        
        var files = [];
        var files_downloaded = 0;
        
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                files.push(key);
            };
        };
        
        var render = false;
        
        var $status = $('#issue_'+foldername)

        for (var i=0; i < files.length; i++){
            var data_key = files[i];
            if (i == (files.length-1)){
                render = true;
            };
            
            var ft = new FileTransfer();

                ft.onprogress = function(progressEvent) {
                    if (progressEvent.lengthComputable) {
                        var perc = Math.abs(Math.floor((progressEvent.loaded / progressEvent.total) * 100));
                        $status.html(perc + " Loading...")
                    } else {
                        if($status.innerHTML == "") {
                            $status.innerHTML = "Loading";
                        } else {
                            $status.innerHTML += ".";
                        }
                    }
                };
                
                var dlPath = DATADIR.fullPath + "/" + data_key;
                ft.download("http://eaeissues.appspot.com/getfile/" + data[data_key], dlPath, function(){

                    files_downloaded += 1;
                    //alert(files_downloaded);
                    if (files_downloaded == files.length){
                        set_issue_list();//adds articles once all files are downloaded
                        render_issue(foldername);
                    };
                    
                },onError_test_6);
        };
        
        var string_folder = foldername.toString();
        if (localStorage.downloaded == undefined){
            localStorage.downloaded = string_folder;
        }else{
            localStorage.downloaded = localStorage.downloaded+','+string_folder;
        };
    }, "json")
    .fail(function() {
        no_connection = true;
        set_issue_list();
    });
};

function render_issue(foldername){
    //alert('should render '+foldername);
    DATADIR.getFile("article_list.html", {}, gotFileEntry, onError_test_3);//was "index.html"
};

function gotFileEntry(fileEntry) {
    //alert('gotfileentry');
    fileEntry.file(gotFile, onError_test_4);
}

function gotFile(file){
    //alert('gotfile');
    readAsText(file);
}

function readAsText(file) {
    //alert("Read as text");
    var reader = new FileReader();
    reader.onloadend = function(evt) {

        $('.article_list').html("");
        
        $('#article_list_'+foldername).html(evt.target.result);
        menuScroll.refresh();
    };
    reader.readAsText(file);
}

function close_menu(){
    hide_tab();
    //table_of_contents script needs to be at bottom of html body instead of in document ready...
};

//download recent issue list if user is online
function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
};

function set_issue_list(){
    $('#menu_content').html("");
    var num_issues = parseInt(localStorage.issue_list);
    if(no_connection){
        no_connection = false;
        $('#menu_content').html('please connect to the internet<br>tap<br>"Refresh Issues"<br>to see issue list');
    }else{
        for(var i = 0; i<= num_issues; i++){
            
            $('#get_issues_btn').html('Refresh Issues');
            
            if (localStorage.downloaded){
                var str = localStorage.downloaded;
                var n = str.split(",");
                var i_string = i.toString();
                var in_array = $.inArray(i_string,n);
                
                if (in_array > -1){
                    $('#menu_content').append('<div class="issue_download downloaded" id="issue_'+i+'">Issue '+i+'</div><div id="article_list_'+i+'" class="article_list"></div>');
                }else{
                    $('#menu_content').append('<div class="issue_download" id="issue_'+i+'">Download Issue '+i+'</div><div id="article_list_'+i+'" class="article_list"></div>');
                };
            }else{
                $('#menu_content').append('<div class="issue_download" id="issue_'+i+'">Download Issue '+i+'</div>');
            };

        };
        menuScroll.refresh();
    };
    
};


function get_issue_list_handler (){
    $.get("http://eaeissues.appspot.com/get_issue_list", {}, function(data) {
        var latest_issue = parseInt(data['issue_num'])
        localStorage.issue_list = latest_issue;

        set_issue_list();

    })
    .fail(function() {
        if (!localStorage.issue_list){
            $('#get_issues_btn').html('Refresh Issues');
            $('#menu_content').html('Cannot download issue list<br>Please connect to the internet');
        }else{
            $('#get_issues_btn').html('Refresh Issues');
            set_issue_list();
        };
    });
};

$(document).ready(function(){
    
    init();
    
    $('body').on('click tap', '#get_issues_btn', function(){

        $('#get_issues_btn').html('Loading');
        get_issue_list_handler();
    });
    
    $('body').on('tap click', '.issue_download', function(){
        
        var div_id = $(this).attr('id');
        var issue = div_id.slice(6);
        
        download_handler(issue);
    });
    
    // !!!!!!!!!!!!!!!!!NBNBNNBNBNBNBNNBNBNBNBBNBNBNBN consider formatting the id so that can include double digit characters i.e. only slice first character
    $(document).on('touchend', '.article', function(){
        var id = $(this).attr('id');
        var filenum = id.slice(1);
        var filename = filenum+'.html';
        //alert(filename);
        render_article(filename);
    });
    
});




