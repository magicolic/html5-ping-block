var GameOverScene = enchant.Class.create(enchant.Scene, {

    initialize: function () {
        'use strict';

        enchant.Scene.call(this);

        var gameOverLabel = new Label('Game Over'),
            pressKeyLabel = new Label('Press \'space\' to play again!');

        gameOverLabel.width = 640;
        gameOverLabel.height = 30;
        gameOverLabel.x = 0;
        gameOverLabel.y = 640 / 2 - 30;
        gameOverLabel.textAlign = 'center';
        gameOverLabel.font = 'bold 30px arial, sans-serif';
        this.addChild(gameOverLabel);

        pressKeyLabel.width = 640;
        pressKeyLabel.height = 20;
        pressKeyLabel.x = 0;
        pressKeyLabel.y = gameOverLabel.y + gameOverLabel.height + 10;
        pressKeyLabel.textAlign = 'center';
        pressKeyLabel.font = 'bold 20px arial, sans-serif';
        this.addChild(pressKeyLabel);
    },

    onabuttonup: function () {
        'use strict';
        App.restart();
    }
});
