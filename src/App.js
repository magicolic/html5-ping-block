var App = (function () {
    'use strict';

    function start() {
        enchant();
        var game = new Game(640, 640);
        game.fps = 60;
        game.preload('img/plate.png', 'img/ball.png', 'img/block.png');
        game.onload = function () {
            var scene = new GameScene();
            game.replaceScene(scene);
        };
        game.start();
    }

    return {
        start: start
    };

}());
