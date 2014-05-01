var GameScene = enchant.Class.create(enchant.Scene, {

    bar: null,
    ball: null,
    blocks: null,

    initialize: function () {
        'use strict';

        enchant.Scene.call(this);

        this.bar = new BarSprite();
        this.ball = new BallSprite();
        this.blocks = [
            new BlockSprite(60, 120, this),
            new BlockSprite(100, 100, this),
            new BlockSprite(140, 120, this),
            new BlockSprite(180, 100, this),
            new BlockSprite(220, 120, this),
            new BlockSprite(260, 100, this),
            new BlockSprite(300, 120, this),
            new BlockSprite(340, 100, this),
            new BlockSprite(380, 120, this),
            new BlockSprite(420, 100, this),
            new BlockSprite(460, 120, this),
            new BlockSprite(500, 100, this),
            new BlockSprite(540, 120, this)
        ];

        this.addChild(this.bar);
        this.addChild(this.ball);

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
            alert('Game Over');
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
