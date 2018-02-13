var loadingText;


WebFontConfig = {
    active: function() {
        game.time.events.add(Phaser.Timer.SECOND, function() {

            loadingText.font = 'Press Start 2P';

        }, this);
    },
    google: {
        families: ['Press Start 2P']
    }
};


var Preloader = {

    preload : function() {

        game.scale.refresh();

        game.load.onLoadStart.add(this.loadStart, this);
        game.load.onFileComplete.add(this.fileComplete, this);
        game.load.onLoadComplete.add(this.loadComplete, this);


        game.stage.backgroundColor = '#78A959';

        // Load all the needed resources for the menu.

        //Global Assets

        game.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');


        //Main Game Assets
        game.load.image('tank', 'assets/img/body-1.png');
        game.load.image('ball', 'assets/img/ball.png');
        game.load.image('background', 'assets/img/background.png');
        game.load.image('target', 'assets/img/target-2.png');
        game.load.image('arrow', 'assets/img/arrow.png');

        //audio
        game.load.audio('start', ['assets/audio/start.mp3']);
        game.load.audio('hit', ['assets/audio/hit.mp3']);
        game.load.audio('kick', ['assets/audio/kick.mp3']);
        game.load.audio('reset', ['assets/audio/reset.mp3']);
        game.load.audio('gameover', ['assets/audio/gameover.mp3']);
        game.load.audio('crash', ['assets/audio/crash.mp3']);


        textStyle = {
            font: '32px Press Start 2P',
            fill: '#ffff00',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        loadingText = game.add.text(w/2, game.height/2, 'Loading', textStyle);
        loadingText.anchor.set(0.5);
        game.load.start();

    },
    loadStart : function(){
        loadingText.setText("Loading ...");
    },
    loadComplete : function(){
        game.state.start('Splash');
    },
    fileComplete : function(progress, cacheKey, success, totalLoaded, totalFiles){
        loadingText.setText("Loading: " + progress + "%");
    },
    create: function () {

    }
};