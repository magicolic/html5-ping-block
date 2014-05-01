var BallSprite = enchant.Class.create(enchant.Sprite, {

    speed: 5,
    xSpeed: 0,
    ySpeed: 5,

    initialize: function () {
        'use strict';

        enchant.Sprite.call(this, 20, 20);

        this.image = enchant.Core.instance.assets['img/ball.png'];
        this.x = (enchant.Core.instance.width / 2) - (this.width / 2);
        this.y = (enchant.Core.instance.height / 2) - (this.height / 2);
    }

});
