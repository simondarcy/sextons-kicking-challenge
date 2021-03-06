
var Game = {
    init: function () {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.gravity.y = 200;
        this.game.renderer.renderSession.roundPixels = true;
        this.game.world.setBounds(0, 0, 992, 480);
    },
    preload: function () {
    },
    create: function () {

        //  Simple but pretty background
        this.background = this.add.sprite(0, 0, 'background');

        //Reset defaults
        this.guide = null;
        this.score = 0;
        this.lives = 3;
        this.dragStart = false;
        this.lifeLost = false;
        this.canShoot = true;

        // The  ball that our player will kick
        this.ball = this.add.sprite(0, 0, 'ball');
        this.ball.scale.set(0.5);
        this.ball.exists = false;
        this.physics.arcade.enable(this.ball);
        this.ball.body.bounce.set(0.8);
        this.ball.body.velocity.set(0, 200);

        //Our player
        this.tank = game.add.sprite(50, 300, 'player');
        this.tank.scale.set(0.4);
        this.tank.frame = 1;

        //a static ball that is in view initially
        this.staticBall = this.add.sprite((this.tank.x + this.tank.width)-20, (this.tank.y + this.tank.height)-35, 'ball');
        this.staticBall.scale.set(0.4);

        //create a shadow on the ground for the ball
        this.shadow = this.add.sprite((this.tank.x + this.tank.width), (this.tank.y + this.tank.height)+ 30, 'shadow');
        this.shadow.alpha = 0.5;
        this.shadow.scale.set(0.5);
        this.shadow.anchor.set(0.5);
        this.shadow.exists = false;

        //  Used to display the power of the shot
        this.power = 0;
        this.powerText = this.add.text(w/2, 20, '0', { font: "18px Arial", fill: "#ffffff" });
        this.powerText.alpha = 0;
        this.powerText.anchor.set(0.5);
        this.powerText.setShadow(1, 1, 'rgba(0, 0, 0, 0.8)', 1);
        this.powerText.fixedToCamera = true;
        this.createTarget();

        //set up camera at other end of pitch initially
        this.camera.x = 900;
        this.add.tween(this.camera).to( { x: 0 }, 1000, "Quint", true, 1000);

        //Initial instructions
        this.instructionText = this.add.text(w/2, h-settings.tipOffset, 'Tap & Drag to shoot', { font: settings.tipFont, fill: "#000000" });
        this.instructionText.anchor.set(0.5);
        this.instructionText.font = 'Press Start 2P';
        this.instructionText.alpha = 1;

        //Create 3 'lives'
        this.createLifeBalls();

        //add score text
        textStyle = {
            font: '40px Press Start 2P',
            fill: '#ffff00',
            align: 'center',
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };
        this.scoreText = game.add.text(w/2, game.height/2, this.score, textStyle);
        this.scoreText.anchor.set(0.5);
        this.scoreText.alpha = 0;


        //audio setup
        _audio_start = game.add.audio('start');
        _audio_gameover = game.add.audio('gameover');
        _audio_hit = game.add.audio('hit');
        _audio_kick = game.add.audio('kick');
        _audio_reset = game.add.audio('reset');
        _audio_crash = game.add.audio('crash');
        _audio_start.play();
    },
    createLifeBalls:function(){
        //create 3 balls at top of screen to represent remaining lives
        this.balls = this.add.group(this.game.world, 'balls', false, true, Phaser.Physics.ARCADE);

        //this.balls.anchor.set(0.5);
        for(var i=0; i<this.lives; i++) {
            this.balls.create((game.width-30) - (30*i), 40, 'ball');
        }

        this.balls.setAll('body.allowGravity', false);
        this.balls.children.forEach(function(b){
            // Here you can apply the same properties to every cup.
            b.anchor.setTo(0.5);
            b.scale.set(0.5);
        });
    },
    removeArrow:function(){
        this.sprite.destroy();
        this.powerText.alpha=0;
    },
     createArrow:function(){
        this.sprite = game.add.sprite(this.game.input.activePointer.x, this.game.input.activePointer.y, 'arrow');
        this.sprite.anchor.setTo(0.5);
        this.sprite.scale.setTo(0.5);
        this.sprite.scale.x *= -1;
        this.guide = new Phaser.Line(0, 0, 0, 0);
        this.powerText.alpha=1;
    },
    createTarget : function (){

        this.target = this.add.sprite(game.rnd.integerInRange(game.world.width-250, game.world.width-100), game.rnd.integerInRange(50, 390), 'target');
        this.target.anchor.set(0.5);
        this.target.scale.set(0);
        this.physics.arcade.enable(this.target);
        this.target.body.allowGravity = false;
        //Animate in
        var targetTween = game.add.tween(this.target.scale);
        targetTween.to({x: 0.2, y: 0.2}, 200, Phaser.Easing.Linear.None);
        targetTween.onComplete.addOnce(function () {

        }, this);
        targetTween.start();
    },
     distance:function(x1, y1, x2, y2) {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    },
    createBall:function(){
        _audio_kick.play();
        this.ball.x = this.staticBall.x;
        this.ball.y = this.staticBall.y;
        this.staticBall.alpha = 0;
        this.ball.angle = 45;
        this.ball.exists = true;
        this.camera.follow(this.ball);
        this.shadow.exists = true;
        this.shadow.x = this.ball.x;
    },



    hitTarget: function (ball, target) {
        this.removeBall();
        _audio_hit.play();

        //increase score
        this.score++;

        //animate score
        this.scoreText.setText(this.score);
        this.scoreText.x = target.x;
        this.scoreText.y = target.y + 50;
        this.scoreText.alpha = 1;
        this.scoreTween = game.add.tween(this.scoreText).to({alpha: 0}, 500, Phaser.Easing.Linear.None, true);

        var killTween = game.add.tween(target.scale);
        killTween.to({x: 0, y: 0}, 200, Phaser.Easing.Linear.None);
        killTween.onComplete.addOnce(function () {
            target.kill();
        }, this);
        killTween.start();
        this.createTarget();
    },

    /**
     * Removes the ball, stops the camera following and tweens the camera back to the tank.
     * Have put this into its own method as it's called from several places.
     *
     * @method removeBall
     */
    removeBall: function () {
        //Adding this here more for UX purposes
        this.instructionText.alpha = 0;
        this.staticBall.alpha = 1;
        this.tank.frame = 1;
        this.ball.x = this.tank.x;
        this.ball.y = this.tank.y;
        this.camera.follow();
        this.ball.exists =  false;
        this.shadow.exists = false;
        tweenTime = (game.camera.x>0)?1000:0; //If ball doesn't leave screen, no point waiting around;
        cameraTween = this.add.tween(this.camera).to( { x: 0 }, tweenTime, "Quint", true, tweenTime);

        if(this.lifeLost && this.lives == 0){
            this.tank.frame = 3;
        }

        cameraTween.onComplete.addOnce(function () {
            if(this.lifeLost) {
                if(this.lives == 2 && this.score ==0){
                    this.instructionText.alpha = 1;
                    this.instructionText.fill = '#FFFF00';
                    this.instructionText.setText('Try use entire screen?');
                }
                if(this.lives == 1){
                    this.instructionText.alpha = 1;
                    this.instructionText.fill = '#FFFF00';
                    this.instructionText.setText('One  ball remaining');
                }
                if (this.lives == 0) {
                    _audio_gameover.play();
                    game.state.start('GameOver')
                }
                else {
                    //lives.last blink kill
                    this.balls.children[0].destroy();
                }
                this.lives--;
                this.lifeLost = false;
            }

            this.canShoot = true;

        }, this);
    },

    /**
     * Core update loop. Handles collision checks and player input.
     *
     * @method update
     */
    update: function () {
        //  If the ball is in flight we don't let them control anything
        if ( this.ball.exists && ( this.ball.y > 420|| this.ball.x > game.world.bounds.width) )
        {
            //  Simple check to see if it's fallen too low
            this.lifeLost=true;
            this.removeBall();
            _audio_crash.play();
        }
        else
        {
            //  Ball vs. the Target
            this.physics.arcade.overlap(this.ball, this.target, this.hitTarget, null, this);
        }

        //Controls
        if( this.canShoot ) {
            if (this.input.activePointer.isDown) {

                if (!this.dragStart) {
                    this.createArrow();
                    this.dragStart = true;
                    this.tank.frame = 0;
                }
                this.sprite.rotation = game.physics.arcade.angleToPointer(this.sprite);
                this.guide.fromSprite(this.sprite, this.game.input.activePointer, false);
                dis = Math.round(this.distance(this.sprite.x, this.sprite.y, this.game.input.activePointer.x, this.game.input.activePointer.y));
                this.powerText.text = 'Power: ' + dis;
            }
            if (this.input.activePointer.isUp && this.dragStart) {
                dis = Math.round(this.distance(this.sprite.x, this.sprite.y, this.game.input.activePointer.x, this.game.input.activePointer.y));
                this.guide = new Phaser.Line(0, 0, 0, 0);
                this.dragStart = false;
                this.removeArrow();
                if(dis<30) {//prevent accidental taps ben counted
                    this.tank.frame = 1;
                    return;
                }
                this.canShoot = false;
                this.tank.frame = 2;
                this.createBall();
                _audio_kick.play();
                if(dis<120)dis = 120; //Have a minimum
                this.physics.arcade.velocityFromRotation(this.sprite.rotation, -dis * 2.5, this.ball.body.velocity);

            }
        }//end can shoot


        this.shadow.x = this.ball.x;
        shadowScale =  Math.round(10 - (Math.abs(this.ball.y-this.shadow.y)/100) ) ;
        this.shadow.scale.set(shadowScale/10)

    },
    render:function() {
        this.game.debug.geom(this.guide, '#FFFFFF');
    }


};
