var GameScene = enchant.Class.create(enchant.Scene, {

    bar: null,
    ball: null,

    initialize: function () {
        'use strict';

        enchant.Scene.call(this);

        this.bar = new BarSprite();
        this.ball = new BallSprite();

        this.addChild(this.bar);
        this.addChild(this.ball);
    },

    onleftbuttondown: function () {
        'use strict';

        var newX = this.bar.x - 10;

        if (newX > 0) {
            this.bar.x = newX;
        } else {
            this.bar.x = 0;
        }
    },

    onrightbuttondown: function () {
        'use strict';

        var newX = this.bar.x + 10;

        if (newX + this.bar.width < enchant.Core.instance.width) {
            this.bar.x = newX;
        } else {
            this.bar.x = enchant.Core.instance.width - this.bar.width;
        }
    },

    onenterframe: function () {
        'use strict';

        var newX = null,
            newY = null,
            maxX = enchant.Core.instance.width - this.ball.width,
            maxY = enchant.Core.instance.height - this.ball.height;

        if (!this.ball.ballCollision) {
            if (this.ball.y <= 0) {
                this.ball.speedY = 5;
                newY = 0;
                this.ball.ballCollision = true;
            } else if (this.ball.y >= maxY) {
                this.ball.speedY = -5;
                newY = maxY;
                this.ball.ballCollision = true;
                alert('Game Over');
            }

            if (this.ball.x <= 0) {
                this.ball.speedX = 5;
                newX = 0;
                this.ball.ballCollision = true;
            } else if (this.ball.x >= maxX) {
                this.ball.speedX = -5;
                newX = maxX;
                this.ball.ballCollision = true;
            }

            if (this.ball.intersect(this.bar)) {
                this.ball.speedY *= -1;
                this.ball.speedX *= -1;
                this.ball.ballCollision = true;
            }
        } else {
            this.ball.ballCollision = false;
        }

        if (newX === null) {
            newX = this.ball.x + this.ball.speedX;
        }
        if (newY === null) {
            newY = this.ball.y + this.ball.speedY;
        }

        this.ball.x = newX;
        this.ball.y = newY;
    }

});
