var mobileSettings = {
    splashNameTop:45,
    splashJohnnyScale:0.8,
    splashTitleOffset:130,
    isMobile:true
};

var desktopSettings = {
    splashNameTop:25,
    splashJohnnyScale:0.7,
    splashTitleOffset:100,
    isMobile:false};

//Mobile First
var settings = mobileSettings;

//Get the width/height of screen
var w = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

//At what point do we want to switch to the desktop settings?
if(w>650){
    w = 640;
    h = 480;
    //Switch to desktop settings
    settings = desktopSettings;
}



