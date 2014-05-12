var StartScene = enchant.Class.create(enchant.Scene, {

    initialize: function () {
        'use strict';

        enchant.Scene.call(this);

        var bg = new Sprite(640, 640),
            pressSpace = new Label('Press \'space\' to start the game');

        bg.image = enchant.Core.instance.assets['img/start-scene-background.png'];
        bg.x = 0;
        bg.y = 0;
        this.addChild(bg);

        pressSpace.width = 640;
        pressSpace.height = 30;
        pressSpace.textAlign = 'center';
        pressSpace.font = 'bold 30px arial, sans-serif';
        pressSpace.x = 0;
        pressSpace.y = 560;
        this.addChild(pressSpace);

        pressSpace.tl.scaleTo(1.1, 1.1, 100).scaleTo(1, 1, 100).loop();
    },

    onabuttonup: function () {
        'use strict';
        App.restart();
    }
});
