var w = Math.max (document.documentElement.clientWidth, window.innerWidth || 0);
var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

if(w>650){
    w = 640;
    h = 480;
}




var game = new Phaser.Game(w, h, Phaser.CANVAS, 'game');
game.state.add('Preloader', Preloader);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);
game.state.start('Preloader');

