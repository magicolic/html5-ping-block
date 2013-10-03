var BarSprite = enchant.Class.create(enchant.Sprite, {

    initialize: function () {
        'use strict';

        enchant.Sprite.call(this, 100, 20);

        this.image = enchant.Core.instance.assets['img/plate.png'];
        this.x = (enchant.Core.instance.width / 2) - (this.width / 2);
        this.y = enchant.Core.instance.height - this.height;
    }

});
