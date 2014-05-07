var BlockSprite = enchant.Class.create(enchant.Sprite, {

    initialize: function (x, y, life) {
        'use strict';

        enchant.Sprite.call(this, 40, 20);

        this.x = x;
        this.y = y;
        this.life = life;
        this.refreshImage();
    },

    hit: function () {
        'use strict';
        enchant.Core.instance.assets['img/ball-hit.wav'].play();

        this.life -= 1;

        if (this.life === 0) {
            enchant.Core.instance.currentScene.removeChild(this);
            return;
        }

        this.refreshImage();
    },

    refreshImage: function () {
        'use strict';
        switch (this.life) {
        case 3:
            this.image = enchant.Core.instance.assets['img/block-yellow.png'];
            break;
        case 2:
            this.image = enchant.Core.instance.assets['img/block-red.png'];
            break;
        default:
            this.image = enchant.Core.instance.assets['img/block-blue.png'];
        }
    }

});
