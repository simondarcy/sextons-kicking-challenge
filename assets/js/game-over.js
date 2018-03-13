var GameOver = {
    init: function () {},
    preload: function () {},
    create: function () {

        this.background = this.add.sprite(0, 0, 'background');

        textStyle = {
            font: '30px Press Start 2P',
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        headingText = game.add.text(game.width/2, 50, "Your Score", textStyle);
        headingText.anchor.set(0.5);


        textStyle = {
            font: '50px Press Start 2P',
            fill: '#000000',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        scoreText = game.add.text(w/2, headingText.y+100, Game.score, textStyle);
        scoreText.anchor.set(0.5);

        //Add tap to replay
        instructionHeadingTextStyle = { font: '20px Press Start 2P' , fill: '#FFFF00', align:'center', boundsAlignH: "center", boundsAlignV: "middle" };
        instructionHeading = game.add.text(game.width/2, (game.height)-100, "Tap to Play Again", instructionHeadingTextStyle);
        instructionHeading.anchor.set(0.5);
        instructionHeading.alpha = 0;
        instructionHeadingTween = game.add.tween(instructionHeading).to( { alpha: 1 }, 800, Phaser.Easing.Linear.None, true, 0, 800, true);

        instructionHeading.inputEnabled = true;
        instructionHeading.events.onInputDown.add(function(){
            game.state.start('Game');
        }, this);



        //logo
        logo = this.add.sprite(game.width/2, game.height-30, 'logo');
        logo.scale.set(0.5);
        logo.anchor.set(0.5);
        logo.inputEnabled = true;
        logo.events.onInputUp.add(function(){
            window.open("https://www.balls.ie/", "_blank")
        }, this);
        //social

        var facebook = game.add.button(w/2 - 100, instructionHeading.y-95, 'facebook');
        facebook.anchor.setTo(0.5);

        var twitter = game.add.button(w/2, instructionHeading.y-95, 'twitter');
        twitter.anchor.setTo(0.5);
        var link;
        if(settings.isMobile) {
            link = game.add.button(w/2 + 100, instructionHeading.y - 95, 'whatsapp');
        }
        else{
            link = game.add.button(w/2+ 100, instructionHeading.y - 95, 'link');
        }
        link.anchor.setTo(0.5);

        facebook.onInputUp.add(function(){
            url = "//www.facebook.com/sharer/sharer.php?u="+shareURL;
            window.open(url, "_blank")

        }, this);
        twitter.onInputUp.add(function(){
            shareText = "Me and @johnnysexton hit " + Game.score + " targets playing Johnny's Kicking Challenge! How many can you score? @IrishRugby";
            url = "//twitter.com/share?url="+shareURL+"&text="+shareText+"&via=ballsdotie&hashtags=TeamOfUs,ENGvIRE,NatWest6Nations";
            window.open(url, "_blank")
        }, this);

        link.onInputUp.add(function(){
            shareText = "Me and Johnny Sexton just hit " + Game.score + " targets playing Johnny's Kicking Challenge! How many can you get? Play here: "+shareURL;

            //If mobile open in whatsapp
            if(settings.isMobile){
                url = "whatsapp://send?text=" + shareText;
                window.open(url, "_blank")
            }
            else{
                //If desktop, copy link to clipboard
                var $temp = document.createElement("input");
                document.body.appendChild($temp);
                $temp.value = shareText;
                $temp.focus();
                $temp.select();
                document.execCommand("copy");
                document.body.removeChild($temp);
                alert("Game link copied to clipboard. Thanks for sharing!");
            }

        }, this);

        //end social


        textStyle = {
            font: '18px Press Start 2P',
            fill: '#FFFFFF',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        shareText = game.add.text(w/2, link.y-60, "Share your score", textStyle);
        shareText.anchor.set(0.5);


    },
    update: function () {}
};
