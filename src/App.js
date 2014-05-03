var App = (function () {
    'use strict';

    var game = null;

    function start() {
        enchant();
        game = new Game(640, 640);
        game.fps = 60;
        game.keybind(32, 'a'); // 32 is space key
        game.preload('img/plate.png', 'img/ball.png', 'img/block.png');
        game.onload = function () {
            game.replaceScene(new GameScene());
        };
        game.start();
    }

    function restart() {
        game.replaceScene(new GameScene());
    }

    return {
        start: start,
        restart: restart
    };

}());
