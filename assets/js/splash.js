var Splash = {
    init: function () {},
    preload: function () {},
    create: function () {


        this.background = this.add.sprite(0, 0, 'background');



        //  Animate a ball
        ball = this.add.sprite(-100, -100, 'ball');
        ball.anchor.set(0.5);
        game.physics.arcade.enable(ball);
        ball.body.bounce.set(0.8);
        ball.body.velocity.set(100, 100);
        ball.body.collideWorldBounds = true;
        ball.alpha = 0.8;

        //Animate a target

        target = this.add.sprite(w+100, -100, 'target');
        target.anchor.set(0.5);
        game.physics.arcade.enable(target);
        target.body.bounce.set(0.8);
        target.body.velocity.set(-100, 100);
        target.alpha = 0.8;
        target.scale.set(0.2);
        target.body.collideWorldBounds = true;


        textStyle = {
            font: '22px Press Start 2P',
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        nameText = game.add.text(game.width/2, settings.splashNameTop, "Johnny's", textStyle);
        nameText.anchor.set(0.5);

        textStyle = {
            font: '30px Press Start 2P',
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        titleText = game.add.text(game.width/2, nameText.y+settings.splashTitleOffset, "Kicking\nChallenge", textStyle);
        titleText.anchor.set(0.5, 1);


        //Main guy
        johnny = this.add.sprite(game.width/2, (game.height/2)+settings.johnnyOffset, 'player');
        johnny.scale.set(settings.splashJohnnyScale);
        johnny.anchor.set(0.5);


        //logo
        logo = this.add.sprite(game.width/2, game.height-30, 'logo');
        logo.scale.set(0.5);
        logo.anchor.set(0.5);
        logo.inputEnabled = true;
        logo.events.onInputUp.add(function(){
            window.open("https://www.balls.ie/", "_blank")
        }, this);




        //Add tap to replay
        instructionHeadingTextStyle = { font: '20px Press Start 2P' , fill: '#FFFF00', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeading = game.add.text(game.width/2, (game.height)-80, settings.actionText, instructionHeadingTextStyle);
        instructionHeading.anchor.set(0.5);
        instructionHeading.alpha = 0;
        instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);

        instructionHeading.inputEnabled = true;


        game.input.onTap.add(function(){


            if (typeof(Storage) === "undefined") {
                game.state.start('Instructions');
            }

            //If first time playing, show game instructions
            if(localStorage.getItem("rugbyGameInstructions") == null ){
                localStorage.setItem("rugbyGameInstructions",true);
                game.state.start('Instructions');
            }
            //Otherwise go straight into the game
            else{
                game.state.start('Game');

            }



        }, this);



    },
    update: function () {}
};
