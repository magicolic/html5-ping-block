var App = (function () {
    'use strict';

    var game = null,
        level;

    function goToNextLevel() {
        level += 1;
        if (level === Levels.length) {
            game.replaceScene(new WonScene());
        } else {
            game.replaceScene(new GameScene(Levels[level]));
        }
    }

    function restart() {
        level = 0;
        game.replaceScene(new GameScene(Levels[level]));
    }

    function start() {
        enchant();
        game = new Game(640, 640);
        game.fps = 60;
        game.keybind(32, 'a'); // 32 is space key
        game.preload('img/start-scene-background.png', 'img/plate.png', 'img/ball.png', 'img/block-blue.png', 'img/block-red.png', 'img/block-yellow.png', 'img/ball-hit.wav');
        game.onload = function () {
            game.replaceScene(new StartScene());
        };
        game.start();
    }

    return {
        start: start,
        restart: restart,
        goToNextLevel: goToNextLevel
    };

}());
