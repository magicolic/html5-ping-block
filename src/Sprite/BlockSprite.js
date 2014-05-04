var BlockSprite = enchant.Class.create(enchant.Sprite, {

    initialize: function (x, y) {
        'use strict';

        enchant.Sprite.call(this, 40, 20);

        this.image = enchant.Core.instance.assets['img/block-blue.png'];
        this.x = x;
        this.y = y;
    },

    hit: function () {
        'use strict';
        enchant.Core.instance.currentScene.removeChild(this);
        enchant.Core.instance.assets['img/ball-hit.wav'].play();
    }

});
