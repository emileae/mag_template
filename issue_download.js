// -- downloading files based on a file list that is requested from an external server and storing files on device for later viewing

//Global instance of DirectoryEntry for our data
var DATADIR;
var knownfiles = []; 
var filename = "";
var foldername = "";
var setting_issue_list = false;

//localStorage.issue_list = 1;


//A ton of callback function needed to store files on sd card persistent storage on device
function onFSSuccess(fileSystem) {
    //alert('find or create Directory'+'-'+foldername);
    fileSystem.root.getDirectory("Android/data/iab.com.scknss.www",{create:true, exclusive: false}, function(appID){
        appID.getDirectory(foldername, {create: true, exclusive: false}, madeDir, onError)
    },onError);
}

function madeDir(d){
    //alert('found/made Directory'+'-'+foldername);
    DATADIR = d;
    var reader = DATADIR.createReader();
    reader.readEntries(function(d){
        //alert('done with dirs'+'-'+foldername);
        gotFileEntries(d);
    },onError);
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
        if (setting_issue_list == true){
            return 'not_downloaded'
            setting_issue_list = false;
            //$('#issue_container').append('<div class="issue_download" id="issue_'+foldername+'">Download Issue '+foldername+'</div>');
            //setting_issue_list = false;
            //alert('download');
        }else{
            download_issue_files(foldername);
        };
        //download_issue_files(foldername);
    }else{
        if (setting_issue_list == true){
            return 'downloaded';
            setting_issue_list = false;
            //$('#issue_container').append('<div class="issue_download" id="issue_'+foldername+'">Issue '+foldername+'</div>');
            //setting_issue_list = false;
            //alert('downloaded');
        }else{
            render_issue(foldername);
        };
        //render_issue(foldername);
    };
    
};

function onError(e){
    alert("ERROR");
    //alert(e.target.error.code);
    //alert(JSON.stringify(e));
}

function onDeviceReady() {
    set_issue_list();
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
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var ft = new FileTransfer();
                var dlPath = DATADIR.fullPath + "/" + key;
                //alert("downloading crap to " + dlPath);
                ft.download("http://eaeissues.appspot.com/getfile/" + data[key], dlPath, function(){
                    /*if (localStorage.issuesdownloaded){
                        var issues_downloaded = JSON.parse(localStorage.issuesdownloaded);
                        issues_downloaded.push(issue);
                        localStorage.issuesdownloaded = JSON.stringify(issues_downloaded);
                        alert(issues_downloaded);
                    }else if (!localStorage.issuesdownloaded){
                        var to_local_storage = []
                        var issues_downloaded = to_local_storage;
                        issues_downloaded.push(issue);
                        localStorage.issuesdownloaded = JSON.stringify(issues_downloaded);
                        alert(issues_downloaded);
                    };
                    */
                    
                    //localStorage.issuesdownloaded(JSON.stringify(downloaded_issues));
                },onError);
            }
        };
        render_issue(foldername);
    }, "json");
};

function render_issue(foldername){
    alert('downloaded');
    //alert('should render '+foldername);
    //alert('dir: '+DATADIR.fullPath);
    DATADIR.getFile("index.html", {}, gotFileEntry, onError);
};

function gotFileEntry(fileEntry) {
    //alert('gotfileentry');
    fileEntry.file(gotFile, onError);
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
        //alert(evt.target.result);
        
        $('.scroller').html(evt.target.result);
        pageScroll.refresh();
        
        var imgs = document.getElementsByTagName("img");
        
        for(var i = 0; i < imgs.length; i++){
           var file_name = imgs[i].getAttribute('id');
           imgs[i].src = DATADIR.fullPath+'/'+file_name;
           //alert(imgs[i].src);
           close_menu();
        }
    };
    reader.readAsText(file);
}

function close_menu(){
    hide_tab();
    //table_of_contents script needs to be at bottom of html body instead of in document ready...
};

//only add download buttons once device is ready
function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
};

function set_issue_list(){
    for(var i = 0; i<= localStorage.issue_list; i++){
        //if (i.toString()){}// !!!!!!!!!!!!!!!!!!!!
        /*var downloaded_issues = JSON.parse(localStorage.issuesdownloaded);
        var string_issue = i.toString();
        if ($.inArray(string_issue, downloaded_issues) > -1 ){
            $('#issue_container').append('<div class="issue_download" id="issue_'+i+'">Issue '+i+'</div>');
        }else{
            $('#issue_container').append('<div class="issue_download" id="issue_'+i+'">Download Issue '+i+'</div>');
        };*/
        
        
        //$('#issue_container').append('<div class="issue_download" id="issue_'+i+'">Download Issue '+i+'</div>');
        
        setting_issue_list = true;
        if (download_handler(i) == 'downloaded'){
            $('#issue_container').append('<div class="issue_download" id="issue_'+i+'"> Issue '+i+'</div>');
        }else if (download_handler(i) == 'not_downloaded'){
            $('#issue_container').append('<div class="issue_download" id="issue_'+i+'">Download Issue '+i+'</div>');
        };
        
        //setting_issue_list = true;
        //download_handler(i);
    };
};


$(document).ready(function(){
    
    //set_issue_list();
    
    $('body').on('click tap', '#get_issues_btn', function(){
        //alert('yoyo');
        
        $('#get_issues_btn').html('Loading');
        
        $.get("http://eaeissues.appspot.com/get_issue_list", {}, function(data) {
            var latest_issue = parseInt(data['issue_num'])
            localStorage.issue_list = latest_issue;
            //alert(localStorage.issue_list);
            
            $('#issue_container').html("");
            set_issue_list();
            
            $('#get_issues_btn').hide();
        });
    });
    
    $('body').on('tap click', '.issue_download', function(){
    
        var div_id = $(this).attr('id');
        var issue = div_id.slice(6);
        
        //alert('issue number: '+issue);
        
        download_handler(issue);
        hide_tab();
    });
});




