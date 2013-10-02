var App = (function () {
    'use strict';

    function start() {
        enchant();
        var game = new Game(640, 640);
        game.preload('img/plate.png', 'img/ball.png');
        game.onload = function () {
            var scene = new Scene(),
                plate = new Sprite(100, 20),
                ball = new Sprite(20, 20),
                ballSpeedX = 5,
                ballSpeedY = 5,
                ballCollision = false;

            plate.image = game.assets['img/plate.png'];
            plate.x = (game.width / 2) - (plate.width / 2);
            plate.y = game.height - plate.height;
            scene.addChild(plate);

            ball.image = game.assets['img/ball.png'];
            ball.x = (game.width / 2) - (ball.width / 2);
            ball.y = (game.height / 2) - (ball.height / 2);
            scene.addChild(ball);

            scene.addEventListener(enchant.Event.RIGHT_BUTTON_DOWN, function () {
                var newX = plate.x + 10;

                if (newX + plate.width < game.width) {
                    plate.x = newX;
                } else {
                    plate.x = game.width - plate.width;
                }
            });
            scene.addEventListener(enchant.Event.LEFT_BUTTON_DOWN, function () {
                var newX = plate.x - 10;

                if (newX > 0) {
                    plate.x = newX;
                } else {
                    plate.x = 0;
                }
            });

            ball.addEventListener(enchant.Event.ENTER_FRAME, function () {
                var newX = null,
                    newY = null,
                    maxX = game.width - ball.width,
                    maxY = game.height - ball.height;

                if (!ballCollision) {
                    if (ball.y <= 0) {
                        ballSpeedY = 5;
                        newY = 0;
                        ballCollision = true;
                    } else if (ball.y >= maxY) {
                        ballSpeedY = -5;
                        newY = maxY;
                        ballCollision = true;
                        alert('Game Over');
                    }

                    if (ball.x <= 0) {
                        ballSpeedX = 5;
                        newX = 0;
                        ballCollision = true;
                    } else if (ball.x >= maxX) {
                        ballSpeedX = -5;
                        newX = maxX;
                        ballCollision = true;
                    }

                    if (ball.intersect(plate)) {
                        ballSpeedY *= -1;
                        ballSpeedX *= -1;
                        ballCollision = true;
                    }
                } else {
                    ballCollision = false;
                }

                if (newX === null) {
                    newX = ball.x + ballSpeedX;
                }
                if (newY === null) {
                    newY = ball.y + ballSpeedY;
                }

                ball.x = newX;
                ball.y = newY;
            });

            game.pushScene(scene);
        };
        game.start();
    }

    return {
        start: start
    };

}());
