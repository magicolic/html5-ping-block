var WonScene = enchant.Class.create(enchant.Scene, {

    initialize: function () {
        'use strict';

        enchant.Scene.call(this);

        var congratulationLabel = new Label('congratulation'),
            finishTheGameLabel = new Label('you finished the game'),
            pressKeyLabel = new Label('Press \'space\' to play again!');

        congratulationLabel.width = 640;
        congratulationLabel.height = 30;
        congratulationLabel.x = 0;
        congratulationLabel.y = 640 / 2 - ((30 + 30 + 20 + 10) / 2);
        congratulationLabel.textAlign = 'center';
        congratulationLabel.font = 'bold 30px arial, sans-serif';
        this.addChild(congratulationLabel);

        finishTheGameLabel.width = 640;
        finishTheGameLabel.height = 30;
        finishTheGameLabel.x = 0;
        finishTheGameLabel.y = congratulationLabel.y + congratulationLabel.height;
        finishTheGameLabel.textAlign = 'center';
        finishTheGameLabel.font = 'bold 30px arial, sans-serif';
        this.addChild(finishTheGameLabel);

        pressKeyLabel.width = 640;
        pressKeyLabel.height = 20;
        pressKeyLabel.x = 0;
        pressKeyLabel.y = finishTheGameLabel.y + finishTheGameLabel.height + 10;
        pressKeyLabel.textAlign = 'center';
        pressKeyLabel.font = 'bold 20px arial, sans-serif';
        this.addChild(pressKeyLabel);
    },

    onabuttonup: function () {
        'use strict';
        App.restart();
    }
});
