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

        this.moveTheBall2(0, '', 'down');
    },

    onenterframe: function () {
        'use strict';

        var maxX = enchant.Core.instance.width - this.ball.width,
            maxY = enchant.Core.instance.height - this.ball.height,
            i = 0;

        if (enchant.Core.instance.input.left && !enchant.Core.instance.input.right) {
            if (this.bar.x - 10 > 0) {
                this.bar.x -= 10;
                this.bar.isMovingLeft = true;
            } else {
                this.bar.x = 0;
                this.bar.isMovingLeft = false;
            }
        } else {
            this.bar.isMovingLeft = false;
        }

        if (enchant.Core.instance.input.right && !enchant.Core.instance.input.left) {
            if (this.bar.x + this.bar.width + 10 < enchant.Core.instance.width) {
                this.bar.x += 10;
                this.bar.isMovingRight = true;
            } else {
                this.bar.x = enchant.Core.instance.width - this.bar.width;
                this.bar.isMovingRight = false;
            }
        } else {
            this.bar.isMovingRight = false;
        }

        for (i = 0; i < this.blocks.length; i += 1) {
            if (this.blocks[i].intersect(this.ball)) {
                if (this.ball.x >= this.blocks[i].x + this.blocks[i].width - 1 ||
                        this.ball.x <= this.blocks[i].x + 1) {
                    if (this.ball.xDirection === 'left') {
                        this.ball.tl.clear();
                        this.moveTheBall2(this.ball.angle, 'right', this.ball.yDirection);
                        return;
                    }

                    this.ball.tl.clear();
                    this.moveTheBall2(this.ball.angle, 'left', this.ball.yDirection);
                    return;
                }

                if (this.ball.yDirection === 'up') {
                    this.ball.tl.clear();
                    this.moveTheBall2(this.ball.angle, this.ball.xDirection, 'down');
                    return;
                }

                this.ball.tl.clear();
                this.moveTheBall2(this.ball.angle, this.ball.xDirection, 'up');
                return;
            }
        }

        if (this.ball.y >= maxY) {
            alert('Game Over');
        } else if (this.ball.y <= 0) {
            this.ball.tl.clear();
            this.moveTheBall2(this.ball.angle, this.ball.xDirection, 'down');
            return;
        }
        if (this.ball.x <= 0) {
            this.ball.tl.clear();
            this.moveTheBall2(this.ball.angle, 'right', this.ball.yDirection);
            return;
        }
        if (this.ball.x >= maxX) {
            this.ball.tl.clear();
            this.moveTheBall2(this.ball.angle, 'left', this.ball.yDirection);
            return;
        }

        if (this.ball.intersect(this.bar)) {
            this.ball.tl.clear();
            if (this.bar.isMovingLeft) {
                if (this.ball.angle === 0) {
                    this.moveTheBall2(45, 'left', 'up');
                    return;
                }
                if (this.ball.angle === 45) {
                    if (this.ball.xDirection === 'right') {
                        this.moveTheBall2(0, '', 'up');
                        return;
                    }
                    this.moveTheBall2(45, 'left', 'up');
                    return;
                }
            } else if (this.bar.isMovingRight) {
                if (this.ball.angle === 0) {
                    this.moveTheBall2(45, 'right', 'up');
                    return;
                }
                if (this.ball.angle === 45) {
                    if (this.ball.xDirection === 'left') {
                        this.moveTheBall2(0, '', 'up');
                        return;
                    }
                    this.moveTheBall2(45, 'right', 'up');
                    return;
                }
            } else {
                this.moveTheBall2(this.ball.angle, this.ball.xDirection, 'up');
                return;
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
