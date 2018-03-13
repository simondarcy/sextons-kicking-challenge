var game = new Phaser.Game(w, h, Phaser.CANVAS, 'game');
game.state.add('Preloader', Preloader);
game.state.add('Splash', Splash);
game.state.add('Instructions', Instructions);
game.state.add('Game', Game);
game.state.add('GameOver', GameOver);
game.state.start('Preloader');

