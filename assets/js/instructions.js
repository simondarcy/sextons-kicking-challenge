var Instructions = {
    init: function () {},
    preload: function () {},
    create: function () {


        this.background = this.add.sprite(0, 0, 'background');

        textStyle = {
            font: '20px Press Start 2P',
            fill: '#ffff00',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        titleText = game.add.text(game.width/2, settings.splashNameTop, "How to play", textStyle);
        titleText.anchor.set(0.5);

        
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

        textStyle = {
            font: settings.instructionsFont,
            fill: '#ffffff',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        titleText = game.add.text(game.width/2, game.height-(game.height/4)-settings.instructionsOffset, settings.instructionsText, textStyle);
        titleText.anchor.set(0.5, 0);


        //Add the arrow
        this.sprite = game.add.sprite(game.width-(this.game.width/4), (game.height/2)-150, 'arrow');
        this.sprite.anchor.setTo(0.5);
        this.sprite.scale.x *= -1;
        this.sprite.angle = 135;
        this.guide = new Phaser.Line(0, 0, 0, 0);


        //add finger

        this.finger = game.add.sprite(this.sprite.x-10, this.sprite.y+10, 'guide-image');
        this.finger.anchor.setTo(0.5);
        this.finger.scale.setTo(1.5);
        this.finger.alpha = 0.6;




        game.input.onTap.add(function(){
            game.state.start('Game');
        }, this);


        instructionHeadingTween = game.add.tween(this.finger).to( settings.guideTween, 800, Phaser.Easing.Linear.None, true, 0, 600, true);





    },
    update: function () {
        this.guide.fromSprite(this.sprite, this.finger, false);
    },
    fingerTween:function(){





    },
    render:function() {
        this.game.debug.geom(this.guide, '#FFFFFF');
    }
}

