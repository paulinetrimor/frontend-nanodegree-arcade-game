// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances of enemy -pt
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // which will ensure the game runs at the same speed for
    this.x += this.speed * dt; 

    //set place and speed of enemy
    if (this.x > 510) {
        this.x = -50; //we want the head of enemy to start at 0
        this.speed = 100 + Math.floor(Math.random() * 222);

    }


    //resets the player to starting block if killed by enemy
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        player.y + 60 > this.y) {
        player.x = 202;
        player.y = 405;
    };


};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player object and its properties
var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-cat-girl.png';
}

Player.prototype.update = function (dt) {

}

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.player), this.x, this.y);
}

Player.prototype.handleInput = function (keyPress) {
    if (keyPress == 'left' && this.x > 0) {
        this.x -= 102;
    }
    if (keyPress == 'right' && this.x < 405) {
        this.x += 102;
    }
    if (keyPress == 'up' && this.y > 0) {
        this.y -= 83;
    }
    if (keyPress == 'down' && this.y < 405) {
        this.y += 83;
    }
    if (this.y < 0) {
        setTimeout(function () {
            player.x = 202;
            player.y = 405;
        }, 100);
    }

}

var Gems = function(x,y) {
    this.x = x;
    this.y = y;
    this.gems = 'images/Gem Blue.png';
} 

Gems.prototype.update = function() {
    //update new location of gem if player reaches it
    if (player.x < this.x + 80 &&
        player.x + 80 > this.x &&
        player.y < this.y + 60 &&
        player.y + 60 > this.y) {
        this.x = 550;
        this.y = 620;
        //call for new gem
    };
}

Gems.prototype.render = function () {
    ctx.drawImage(Resources.get(this.gems), this.x, this.y);
}

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

//setting enemy locations Y-axis
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy); //push into allEnemies array
})
// Place the player object in a variable called player
var player = new Player(202, 405);

var gems = new Gems(202, 147);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
