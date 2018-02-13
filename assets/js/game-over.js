var GameOver = {
    init: function () {},
    preload: function () {},
    create: function () {

        textStyle = {
            font: '30px Press Start 2P',
            fill: '#FFFFFF',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        scoreText = game.add.text(game.width/2, 100, "Your Score \n " + Game.score, textStyle);
        scoreText.anchor.set(0.5);



        //Add tap to replay
        instructionHeadingTextStyle = { font: '20px Press Start 2P' , fill: '#ffe600', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeading = game.add.text(game.width/2, (game.height/2)+80, "Tap to Play Again", instructionHeadingTextStyle);
        instructionHeading.anchor.set(0.5);
        instructionHeading.alpha = 0;
        instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);

        instructionHeading.inputEnabled = true;
        instructionHeading.events.onInputDown.add(function(){
            game.state.start('Game');
        }, this);



    },
    update: function () {}
};
