//Global instance of DirectoryEntry for our data
var DATADIR;
var knownfiles = []; 
var filename = "";
var foldername = ""

//localStorage.issue_list = 1;

//Loaded my file system, now let's get a directory entry for where I'll store my crap    
function onFSSuccess(fileSystem) {
    alert('find or create Directory'+'-'+foldername);
    fileSystem.root.getDirectory("Android/data/iab.com.scknss.www",{create:true, exclusive: false}, function(appID){
        appID.getDirectory(foldername, {create: true, exclusive: false}, madeDir, onError)
    },onError);
}

function madeDir(d){
    alert('found/made Directory'+'-'+foldername);
    DATADIR = d;
    var reader = DATADIR.createReader();
    reader.readEntries(function(d){
        alert('done with dirs'+'-'+foldername);
        gotFileEntries(d);
    },onError);
};

function gotFileEntries(fileEntries) {
    alert("The dir has "+fileEntries.length+" entries."+'-'+foldername);

    var file_in_dir = false;
    
    // NBNBNBNBNBNBNBNBN Should make some sort of check that all files that are necessary are downloaded, download may be interrupted
    
    if(fileEntries.length>0){
        file_in_dir = true;
    }else if (fileEntries.length<=0){
        file_in_dir = false;
    };
    
    if (!file_in_dir){
        download_issue_files(foldername)
    }else{
        render_issue(foldername);
    };
    
};

function onError(e){
    alert("ERROR");
    alert(e.target.error.code);
    alert(JSON.stringify(e));
}

function onDeviceReady() {
    $('body').append('download Issue: <button class="download_issue">1</button>');
    $('body').append('download Issue: <button class="download_issue">2</button>');
}

function download_handler(issue){
    alert('download handler'+issue);
    foldername = issue;
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, onFSSuccess, null);
};

function download_issue_files(issue){
    alert('getting file dict to download');
    $.get("http://eaeissues.appspot.com/getfilelist/"+issue+"", {}, function(data) {
        //function(data){returns list of files to download}
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var ft = new FileTransfer();
                var dlPath = DATADIR.fullPath + "/" + key;
                //alert("downloading crap to " + dlPath);
                ft.download("http://eaeissues.appspot.com/getfile/" + data[key], dlPath, function(e){
                
                })
            }
        };
        render_issue(foldername);
    }, "json");
};

function render_issue(foldername){
    alert('should render '+foldername);
    alert('dir: '+DATADIR.fullPath);
    DATADIR.getFile("index.html", {}, gotFileEntry, onError);
};

function gotFileEntry(fileEntry) {
    alert('gotfileentry');
    fileEntry.file(gotFile, onError);
}

function gotFile(file){
    //readDataUrl(file);
    alert('gotfile');
    readAsText(file);
}

function readAsText(file) {
    alert("Read as text");
    var reader = new FileReader();
    reader.onloadend = function(evt) {
        alert(evt.target.result);
        $('.scroller').html(evt.target.result);
        
        var imgs = document.getElementsByTagName("img");
        for(var i = 0; i < imgs.length; i++){
           var file_name = imgs[i].getAttribute('id');
           imgs[i].src = DATADIR.fullPath+'/'+file_name;
           alert(imgs[i].src);
        }
    };
    reader.readAsText(file);
}

function init() {
    document.addEventListener("deviceready", onDeviceReady, true);
};

function set_issue_list(){
    for(var i = 0; i< localStorage.issue_list; i++){
        $('#issue_container').append('<div class="issue_download" id="issue_'+i+'">Download Issue '+i+'</div>');
    };
};


$(document).ready(function(){
    
    set_issue_list();
    
    $('body').on('click tap', '#get_issues_btn', function(){
        //alert('yoyo');
        
        $('#get_issues_btn').html('Loading');
        
        $.get("http://eaeissues.appspot.com/get_issue_list", {}, function(data) {
            var latest_issue = parseInt(data['issue_num'])
            localStorage.issue_list = latest_issue;
            alert(localStorage.issue_list);
            
            $('#issue_container').html("");
            set_issue_list();
            
            $('#get_issues_btn').hide();
        });
    });
    
    $('body').on('tap click', '.issue_download', function(){
        
        alert('tapped');
    
        var div_id = $(this).attr('id');
        var issue = div_id.slice(6);
        
        alert(issue);
        
        download_handler(issue);
        
    });

});




