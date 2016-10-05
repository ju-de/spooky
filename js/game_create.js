var bitmap;
var shadow;
var player_mask;

var map;
var groundLayer, bottomLayer, midLayer, topLayer, aboveLayer, collisionLayer;
var entitiesLayer, playerLayer;

var player;
var pumpkins = [];
var enemies = {
    'ghosts': [],
    'skeletons': []
};

var cursors;
var keyPumpkin;

function create() {
    console.log("Game created");

    game.physics.startSystem(Phaser.Physics.Arcade);

    // draw environment
    game.world.setBounds(0, 0, 640, 624);

    // set up tilemap
    map = game.add.tilemap('map');
    map.addTilesetImage('environment', 'map_tiles');

    // create tilemap layers
    collisionLayer = map.createLayer('collision');
    groundLayer = map.createLayer('ground');
    bottomLayer = map.createLayer('bottom');

    // create player & player-interactable objects between appropriate layers
    entitiesLayer = game.add.group();
    playerLayer = game.add.group();

    midLayer = map.createLayer('middle');
    topLayer = map.createLayer('top');
    aboveLayer = map.createLayer('above');

    // make collision layer collidable
    map.setCollisionBetween(1, 100, true, 'collision');
    groundLayer.resizeWorld();


    player = new Player(game.world.centerX, game.world.centerY);

    placePumpkins();
    spawnEnemies();






    // draw shadow & reveal masks
    shadow = game.make.sprite(0, 0, 'shadow');

    // player_mask = game.make.sprite(player.sprite.centerX, player.sprite.centerY, 'mask_40');
    // player_mask.frame = 0;
    // player_mask.anchor.set(0.5, 0.5);

    bitmap = game.make.bitmapData(game.world.width, game.world.height);
    game.add.sprite(0, 0, bitmap);
    // bitmap.draw(shadow).blendDestinationOut().draw(player_mask).blendReset();

    cursors = game.input.keyboard.createCursorKeys();

    keyPumpkin = game.input.keyboard.addKey(Phaser.Keyboard.Z);
    keyPumpkin.onDown.add(togglePumpkin, this);

    game.camera.follow(player.sprite);
}

function togglePumpkin() {
    for (var i = 0; i < pumpkins.length; ++i) {
        if (distBetweenCenters(player.sprite, pumpkins[i].sprite) < 20) {
            pumpkins[i].toggle();
            break;
        }
    }
}

function distBetweenCenters(sprite1, sprite2) {
    return Math.sqrt(Math.pow(sprite2.centerX - sprite1.centerX, 2) + Math.pow(sprite2.centerY - sprite1.centerY, 2));
}

function placePumpkins() {
    pumpkins.push(
        new Pumpkin(192, 192),
        new Pumpkin(384, 192),
        new Pumpkin(384, 384)
    );
}

function spawnEnemies() {
    enemies['ghosts'].push(
        new Ghost(180, 200),
        new Ghost(220, 200)
    );
}