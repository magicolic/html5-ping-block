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

        this.moveTheBall2(0, '', 'down');
    },

    onleftbuttondown: function () {
        'use strict';

        var newX = this.bar.x - 10;

        if (newX > 0) {
            this.bar.x = newX;
            this.bar.isMovingLeft = true;
        } else {
            this.bar.x = 0;
            this.bar.isMovingLeft = false;
        }
    },

    onleftbuttonup: function () {
        'use strict';
        this.bar.isMovingLeft = false;
    },

    onrightbuttondown: function () {
        'use strict';

        var newX = this.bar.x + 10;

        if (newX + this.bar.width < enchant.Core.instance.width) {
            this.bar.x = newX;
            this.bar.isMovingRight = true;
        } else {
            this.bar.x = enchant.Core.instance.width - this.bar.width;
            this.bar.isMovingRight = false;
        }
    },

    onrightbuttonup: function () {
        'use strict';
        this.bar.isMovingRight = false;
    },

    onenterframe: function () {
        'use strict';

        var maxX = enchant.Core.instance.width - this.ball.width,
            maxY = enchant.Core.instance.height - this.ball.height;

        if (this.ball.y >= maxY) {
            alert('Game Over');
        } else if (this.ball.y <= 0) {
            this.ball.tl.clear();
            this.moveTheBall2(this.ball.angle, this.ball.xDirection, 'down');
        } else if (this.ball.x <= 0) {
            this.ball.tl.clear();
            this.moveTheBall2(this.ball.angle, 'right', this.ball.yDirection);
        } else if (this.ball.x >= maxX) {
            this.ball.tl.clear();
            this.moveTheBall2(this.ball.angle, 'left', this.ball.yDirection);
        }

        if (this.ball.intersect(this.bar)) {
            this.ball.tl.clear();
            if (this.bar.isMovingLeft) {
                if (this.ball.angle === 0) {
                    this.moveTheBall2(45, 'left', 'up');
                } else if (this.ball.angle === 45) {
                    if (this.ball.xDirection === 'right') {
                        this.moveTheBall2(0, '', 'up');
                    } else {
                        this.moveTheBall2(45, 'left', 'up');
                    }
                }
            } else if (this.bar.isMovingRight) {
                if (this.ball.angle === 0) {
                    this.moveTheBall2(45, 'right', 'up');
                } else if (this.ball.angle === 45) {
                    if (this.ball.xDirection === 'left') {
                        this.moveTheBall2(0, '', 'up');
                    } else {
                        this.moveTheBall2(45, 'right', 'up');
                    }
                }
            } else {
                this.moveTheBall2(this.ball.angle, this.ball.xDirection, 'up');
            }
        }
    },

    moveTheBall: function (toX, toY) {
        'use strict';

        var distance = this.getDistance(this.ball.x, this.ball.y, toX, toY),
            time = distance / this.ball.speed;

        this.ball.tl.moveTo(toX, toY, time);
    },

    getDistance: function (fromX, fromY, toX, toY) {
        'use strict';

        var x = 0,
            y = 0;

        x = toX - fromX;
        x = x * x;

        y = toY - fromY;
        y = y * y;

        return Math.sqrt(x + y);
    },

    moveTheBall2: function (angle, xDirection, yDirection) {
        'use strict';

        var adjacentLength = 0,
            hypotenuseLength = 0,
            oppositeLength = 0,
            time = 0;

        if (xDirection === '' && yDirection === 'up') {
            hypotenuseLength = this.getDistance(this.ball.x, this.ball.y, this.ball.x, 0);
            time = hypotenuseLength / this.ball.speed;
            this.ball.tl.moveTo(this.ball.x, 0, time);
        } else if (xDirection === '' && yDirection === 'down') {
            hypotenuseLength = this.getDistance(this.ball.x, this.ball.y, this.ball.x, enchant.Core.instance.height);
            time = hypotenuseLength / this.ball.speed;
            this.ball.tl.moveTo(this.ball.x, enchant.Core.instance.height, time);
        } else if (xDirection === 'left' && yDirection === 'up') {
            adjacentLength = this.getDistance(this.ball.x, 0, 0, 0);
            hypotenuseLength = this.getHypotenuse(angle, adjacentLength);
            oppositeLength = this.getOpposite(angle, hypotenuseLength);
            time = hypotenuseLength / this.ball.speed;
            this.ball.tl.moveTo(0, enchant.Core.instance.height - oppositeLength, time);
        } else if (xDirection === 'right' && yDirection === 'up') {
            adjacentLength = this.getDistance(this.ball.x, 0, enchant.Core.instance.width, 0);
            hypotenuseLength = this.getHypotenuse(angle, adjacentLength);
            oppositeLength = this.getOpposite(angle, hypotenuseLength);
            time = hypotenuseLength / this.ball.speed;
            this.ball.tl.moveTo(enchant.Core.instance.width, enchant.Core.instance.height - oppositeLength, time);
        } else if (xDirection === 'left' && yDirection === 'down') {
            adjacentLength = this.getDistance(this.ball.x, 0, 0, 0);
            hypotenuseLength = this.getHypotenuse(angle, adjacentLength);
            oppositeLength = this.getOpposite(angle, hypotenuseLength);
            time = hypotenuseLength / this.ball.speed;
            this.ball.tl.moveTo(0, oppositeLength + this.ball.y, time);
        } else if (xDirection === 'right' && yDirection === 'down') {
            adjacentLength = this.getDistance(this.ball.x, 0, enchant.Core.instance.width, 0);
            hypotenuseLength = this.getHypotenuse(angle, adjacentLength);
            oppositeLength = this.getOpposite(angle, hypotenuseLength);
            time = hypotenuseLength / this.ball.speed;
            this.ball.tl.moveTo(enchant.Core.instance.width, oppositeLength + this.ball.y, time);
        }

        this.ball.xDirection = xDirection;
        this.ball.yDirection = yDirection;
        this.ball.angle = angle;
    },

    getHypotenuse: function (angle, adjacentLength) {
        'use strict';

        return Math.ceil(adjacentLength / Math.cos(angle));
    },

    getOpposite: function (angle, hypotenuse) {
        'use strict';

        return Math.ceil(hypotenuse * Math.sin(angle));
    }

});
