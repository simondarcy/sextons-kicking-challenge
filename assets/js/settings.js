var mobileSettings = {
    splashNameTop:50,
    splashJohnnyScale:0.75,
    johnnyOffset:10,
    splashTitleOffset:100,
    isMobile:true,
    actionText:'Tap to play',
    instructionsFont:'16px Press Start 2P',
    instructionsOffset:20,
    instructionsText:'Tap and drag\nto increase power.\nRelease to shoot',
    guideTween:{x:50,y:380},
    tipFont:'16px Press Start 2P',
    tipOffset:50

};

var desktopSettings = {
    splashNameTop:40,
    splashJohnnyScale:0.6,
    johnnyOffset:20,
    splashTitleOffset:100,
    isMobile:false,
    actionText:'Click to play',
    instructionsFont:'16px Press Start 2P',
    instructionsOffset:40,
    instructionsText:'Click and drag mouse to increase power.\nRelease to shoot',
    guideTween:{x:160,y:360},
    tipFont:'18px Press Start 2P',
    tipOffset:20
};

var shareURL = "http://www.simondarcyonline.com/sexton/";

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



