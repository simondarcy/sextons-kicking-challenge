var Splash = {
    init: function () {},
    preload: function () {},
    create: function () {


        //  A single ball that the tank will fire
        ball = this.add.sprite(-100, -100, 'ball');
        ball.anchor.set(0.5);
        game.physics.arcade.enable(ball);
        ball.body.bounce.set(0.8);
        ball.body.velocity.set(100, 100);

        textStyle = {
            font: '16px Press Start 2P',
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        nameText = game.add.text(game.width/2, settings.splashNameTop, "Johnny Sexton's", textStyle);
        nameText.anchor.set(0.5);

        textStyle = {
            font: '30px Press Start 2P',
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        titleText = game.add.text(game.width/2, (game.height/2)-settings.splashTitleOffset, "Kicking\nChallenge", textStyle);
        titleText.anchor.set(0.5, 1);


        //Main guy
        johnny = this.add.sprite(game.width/2, game.height/2, 'tank');
        johnny.scale.set(settings.splashJohnnyScale);
        johnny.anchor.set(0.5, 0.5);



        //Add tap to replay
        instructionHeadingTextStyle = { font: '20px Press Start 2P' , fill: '#FF69B4', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeading = game.add.text(game.width/2, (game.height)-80, "Tap to Play", instructionHeadingTextStyle);
        instructionHeading.anchor.set(0.5);
        instructionHeading.alpha = 0;
        instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);

        instructionHeading.inputEnabled = true;


        game.input.onTap.add(function(){
            game.state.start('Game');
        }, this);



    },
    update: function () {}
};
