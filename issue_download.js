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

// START FETCH DATADIR FUNCTION

/*
    //set issue and article names globally
function fetch_datadir(issue, articlename){
    article_name = articlename;
    issue_dir = issue;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess_new, null);
};

function onFSSuccess_new(fileSystem) {
    fileSystem.root.getDirectory("Android/data/magtemplate.com.scknss.www",{create:true, exclusive: false}, function(appID){
        appID.getDirectory(issue_dir, {create: true, exclusive: false}, madeDir_new, onError)
    },onError);
};

function madeDir_new(d){
    fetched_datadir = d;
    var reader = fetched_datadir.createReader();
    reader.readEntries(function(d){
        gotFileEntries_new(d);
    },onError);
};

function gotFileEntries_new(fileEntries) {

    var file_in_dir = false;
    
    if(fileEntries.length>0){
        file_in_dir = true;
    }else if (fileEntries.length<=0){
        file_in_dir = false;
    };
    
    if (!file_in_dir){
        alert('no files in folder: '+foldername);
    }else{
        render_article(foldername);
    };
    
};

*/

function render_article(foldername, articlename){
    alert('try to render');
    article_name = articlename;
    DATADIR.getFile(article_name, {}, gotFileEntry_new, onError);
};

function gotFileEntry_new(fileEntry) {
    fileEntry.file(gotFile_new, onError);
};

function gotFile_new(file){
    readAsText_new(file);
};

function readAsText_new(file) {
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        
        $('.scroller').html(evt.target.result);
        pageScroll.refresh();
        
        //setting the src url for all images
        var imgs = document.getElementsByTagName("img");
        
        for(var i = 0; i < imgs.length; i++){
           var file_name = imgs[i].getAttribute('id');
           imgs[i].src = DATADIR.fullPath+'/'+file_name;
           close_menu();
        }
        
    };
    reader.readAsText(file);
};






// END FETCH DATADIR FUNCTION



//A ton of callback function needed to store files on sd card persistent storage on device
function onFSSuccess(fileSystem) {
    //alert('find or create Directory'+'-'+foldername);
    fileSystem.root.getDirectory("Android/data/magtemplate.com.scknss.www",{create:true, exclusive: false}, function(appID){
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

    var file_in_dir = false;
    
    // NBNBNBNBNBNBNBNBN Should make some sort of check that all files that are necessary are downloaded, download may be interrupted
    
    if(fileEntries.length>0){
        file_in_dir = true;
    }else if (fileEntries.length<=0){
        file_in_dir = false;
    };
    
    if (!file_in_dir){
        download_issue_files(foldername);
    }else{
        render_issue(foldername);
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
    alert("ERROR TEST 6");
};

function onDeviceReady() {
    get_issue_list_handler ()
    //$('body').append('download Issue: <button class="download_issue">1</button>');
    //$('body').append('download Issue: <button class="download_issue">2</button>');
}

function download_handler(issue){
    //alert('download handler'+issue);
    foldername = issue;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, null);
};

function download_issue_files(issue){
    //alert('getting file dict to download');
    $.get("http://eaeissues.appspot.com/getfilelist/"+issue+"", {}, function(data) {
        //function(data){returns list of files to download}
        
        var files = [];
        
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                files.push(key);
            };
        };
        
        var render = false;

        for (var i=0; i < files.length; i++){
            var data_key = files[i];
            
            if (i == (files.length-1)){
                render = true;
            };
            
            var ft = new FileTransfer();
                var dlPath = DATADIR.fullPath + "/" + data_key;
                ft.download("http://eaeissues.appspot.com/getfile/" + data[data_key], dlPath, function(){
                    if (render){
                        set_issue_list();//adds articles once all files are downloaded
                        render_issue(foldername);
                    };
                },onError_test_6);
        };
        
        /*
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var ft = new FileTransfer();
                var dlPath = DATADIR.fullPath + "/" + key;
                ft.download("http://eaeissues.appspot.com/getfile/" + data[key], dlPath, function(){
                    alert(key);
                    if (key == 'article_list.html'){
                        set_issue_list();//just refreshing issue list !!!!!!!!!!!!NBNBNBNNBNBNBNBNBNBNBN if this method is used then each issue REQUIRES and article_list.html
                        render_issue(foldername);
                    };
                },onError_test_6);
            }
        };*/
        
        var string_folder = foldername.toString();
        //alert(string_folder);
        if (localStorage.downloaded == undefined){
            localStorage.downloaded = string_folder;
        }else{
            localStorage.downloaded = localStorage.downloaded+','+string_folder;
        };
        //set_issue_list();//just refreshing issue list
        //render_issue(foldername);
    }, "json");
};

function render_issue(foldername){
    //alert(localStorage.downloaded);
    //alert('should render '+foldername);
    //alert('dir: '+DATADIR.fullPath);
    DATADIR.getFile("article_list.html", {}, gotFileEntry, onError_test_3);//was "index.html"
};

function gotFileEntry(fileEntry) {
    //alert('gotfileentry');
    fileEntry.file(gotFile, onError_test_4);
}

function gotFile(file){
    //readDataUrl(file);
    //alert('gotfile');
    readAsText(file);
}

function readAsText(file) {
    //alert("Read as text");
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        
        //$('#issue_container').append(evt.target.result);
        $('#article_list_'+foldername).html(evt.target.result);
        
        /*$('.scroller').html(evt.target.result);
        pageScroll.refresh();
        
        var imgs = document.getElementsByTagName("img");
        
        for(var i = 0; i < imgs.length; i++){
           var file_name = imgs[i].getAttribute('id');
           imgs[i].src = DATADIR.fullPath+'/'+file_name;
           //alert(imgs[i].src);
           close_menu();
        }*/
        render_article('4', '1');
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
    $('#issue_container').html("");
    for(var i = 0; i<= localStorage.issue_list; i++){
        
        $('#get_issues_btn').html('Refresh Issues');
        
        if (localStorage.downloaded){
            //alert('downloads');
            var str = localStorage.downloaded;
            var n = str.split(",");
            var i_string = i.toString();
            var in_array = $.inArray(i_string,n);
            
            if (in_array > -1){
                $('#issue_container').append('<div class="issue_download" id="issue_'+i+'">Issue '+i+'</div><div id="article_list_'+i+'" class="article_list"></div>');
            }else{
                $('#issue_container').append('<div class="issue_download" id="issue_'+i+'">Download Issue '+i+'</div><div id="article_list_'+i+'" class="article_list"></div>');
            };
        }else{
            //alert('no downloads');
            $('#issue_container').append('<div class="issue_download" id="issue_'+i+'">Download Issue '+i+'</div>');
        };

    };
};


function get_issue_list_handler (){
    $.get("http://eaeissues.appspot.com/get_issue_list", {}, function(data) {
        var latest_issue = parseInt(data['issue_num'])
        localStorage.issue_list = latest_issue;

        set_issue_list();

    })
    .fail(function() { 
        set_issue_list(); 
    });//uncomment if an error function is needed
};

$(document).ready(function(){
    
    init();
    
    $('body').on('click tap', '#get_issues_btn', function(){
        //alert('yoyo');
        
        $('#get_issues_btn').html('Loading');
        get_issue_list_handler();
    });
    
    $('body').on('tap click', '.issue_download', function(){
    
        var div_id = $(this).attr('id');
        var issue = div_id.slice(6);
        
        //alert('issue number: '+issue);
        
        download_handler(issue);
        //hide_tab();
    });
    
    /*
    $('body').on('tap', '#a1i4', function(){
        alert('article tapped');
        render_article('4', '1');
    });
    8/
    
});




