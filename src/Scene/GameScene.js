var GameScene = enchant.Class.create(enchant.Scene, {

    bar: null,
    ball: null,
    blocks: null,
    blockHit: 0,

    initialize: function (level) {
        'use strict';

        enchant.Scene.call(this);

        this.bar = new BarSprite();
        this.ball = new BallSprite();
        this.blocks = level.blocks.map(function (block) {
            return new BlockSprite(block.x, block.y);
        });

        this.addChild(this.bar);
        this.addChild(this.ball);
        this.blocks.forEach(function (block) {
            this.addChild(block);
        }, this);

        this.addEventListener('leftbuttondown', function () {
            if (!this.bar.isMovingLeft) {
                var time = this.bar.x * 0.2;
                this.bar.tl.moveTo(0, this.bar.y, time);
                this.bar.isMovingLeft = true;
            }
        });
        this.addEventListener('leftbuttonup', function () {
            this.bar.tl.clear();
            this.bar.isMovingLeft = false;
        });
        this.addEventListener('rightbuttondown', function () {
            if (!this.bar.isMovingRight) {
                var max = 640 - this.bar.width,
                    time = (max - this.bar.x) * 0.2;
                this.bar.tl.moveTo(max, this.bar.y, time);
                this.bar.isMovingRight = true;
            }
        });
        this.addEventListener('rightbuttonup', function () {
            this.bar.tl.clear();
            this.bar.isMovingRight = false;
        });
    },

    onexit: function () {
        'use strict';
        this.removeChild(this.ball);
        this.removeChild(this.bar);
        this.blocks.forEach(function (block) {
            this.removeChild(block);
        }, this);
    },

    onenterframe: function () {
        'use strict';

        var origX = this.ball.x,
            origY = this.ball.y,
            newX = origX + this.ball.xSpeed,
            newY = origY + this.ball.ySpeed;

        this.ball.x += this.ball.xSpeed;
        this.ball.y += this.ball.ySpeed;

        if (BallSprite.intersect(BlockSprite).length > 0) {
            this.ball.x = origX;
            this.ball.y = newY;
            if (BallSprite.intersect(BlockSprite).length > 0) {
                this.ball.ySpeed *= -1;
            } else {
                this.ball.x = newX;
                this.ball.y = origY;
                if (BallSprite.intersect(BlockSprite).length > 0) {
                    this.ball.xSpeed *= -1;
                }
            }

            BallSprite.intersect(BlockSprite).forEach(function (collision) {
                collision[1].hit(this); // 0 is the ball, 1 is the block
                this.blockHit += 1;
            }, this);

            if (this.blockHit === this.blocks.length) {
                App.goToNextLevel();
            }

            return;
        }

        if (this.ball.intersect(this.bar)) {
            this.ball.y = 640 - this.ball.height - this.bar.height - 1;

            this.ball.ySpeed *= -1;

            if (this.bar.isMovingLeft && this.ball.xSpeed > 0) {
                this.ball.xSpeed = 0;
            } else if (this.bar.isMovingLeft && this.ball.xSpeed === 0) {
                this.ball.xSpeed = this.ball.speed * -1;
            } else if (this.bar.isMovingRight && this.ball.xSpeed < 0) {
                this.ball.xSpeed = 0;
            } else if (this.bar.isMovingRight && this.ball.xSpeed === 0) {
                this.ball.xSpeed = this.ball.speed;
            }

            enchant.Core.instance.assets['img/ball-hit.wav'].play();

            return;
        }

        if (this.ball.y + this.ball.height >= 640) {
            enchant.Core.instance.replaceScene(new GameOverScene());
            return;
        }
        if (this.ball.y <= 0) {
            this.ball.y = 1;
            this.ball.ySpeed *= -1;
            enchant.Core.instance.assets['img/ball-hit.wav'].play();
            return;
        }
        if (this.ball.x + this.ball.width >= 640) {
            this.ball.x = 640 - this.ball.width - 1;
            this.ball.xSpeed *= -1;
            enchant.Core.instance.assets['img/ball-hit.wav'].play();
            return;
        }
        if (this.ball.x <= 0) {
            this.ball.x = 1;
            this.ball.xSpeed *= -1;
            enchant.Core.instance.assets['img/ball-hit.wav'].play();
            return;
        }
    }
});
