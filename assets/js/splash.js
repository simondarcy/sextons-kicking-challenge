var Splash = {
    init: function () {},
    preload: function () {},
    create: function () {




        textStyle = {
            font: '16px Press Start 2P',
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        nameText = game.add.text(game.width/2, 45, "Johnny Sexton's", textStyle);
        nameText.anchor.set(0.5);

        textStyle = {
            font: '38px Press Start 2P',
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        titleText = game.add.text(game.width/2, (game.height/2)-150, "Kicking\nChallenge", textStyle);
        titleText.anchor.set(0.5, 1);


        //Main guy
        johnny = this.add.sprite(game.width/2, game.height/2, 'tank');
        johnny.anchor.set(0.5, 0.5);



        //Add tap to replay
        instructionHeadingTextStyle = { font: '20px Press Start 2P' , fill: '#FF69B4', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeading = game.add.text(game.width/2, (game.height)-80, "Insert Coins", instructionHeadingTextStyle);
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
