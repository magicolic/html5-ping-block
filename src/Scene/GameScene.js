var GameScene = enchant.Class.create(enchant.Scene, {

    bar: null,
    ball: null,
    blocks: null,

    initialize: function () {
        'use strict';

        enchant.Scene.call(this);

        this.backgroundColor = 'white';

        this.bar = new BarSprite();
        this.ball = new BallSprite();
        this.blocks = [
            new BlockSprite(60, 120),
            new BlockSprite(100, 100),
            new BlockSprite(140, 120),
            new BlockSprite(180, 100),
            new BlockSprite(220, 120),
            new BlockSprite(260, 100),
            new BlockSprite(300, 120),
            new BlockSprite(340, 100),
            new BlockSprite(380, 120),
            new BlockSprite(420, 100),
            new BlockSprite(460, 120),
            new BlockSprite(500, 100),
            new BlockSprite(540, 120)
        ];

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
        this.childNodes.forEach(function (node) {
            this.removeChild(node);
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
                collision[1].hit(); // 0 is the ball, 1 is the block
            });

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

            return;
        }

        if (this.ball.y + this.ball.height >= 640) {
            enchant.Core.instance.replaceScene(new GameOverScene());
            return;
        }
        if (this.ball.y <= 0) {
            this.ball.y = 1;
            this.ball.ySpeed *= -1;
            return;
        }
        if (this.ball.x + this.ball.width >= 640) {
            this.ball.x = 640 - this.ball.width - 1;
            this.ball.xSpeed *= -1;
            return;
        }
        if (this.ball.x <= 0) {
            this.ball.x = 1;
            this.ball.xSpeed *= -1;
            return;
        }
    }
});
