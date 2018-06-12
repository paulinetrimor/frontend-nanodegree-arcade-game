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

        //update life here
        var life = document.getElementById("lives").textContent;
        life = life--;
        document.getElementById("lives").innerHTML = life;
        

    };

    if (player.x < locationColumn[arrayCol] + 80 &&
        player.x + 80 > locationColumn[arrayCol] &&
        player.y < locationRow[arrayRow] + 60 &&
        player.y + 60 > locationRow[arrayRow]) {
        
        randFunc();
        gems.x = locationColumn[arrayCol];
        gems.y = locationRow[arrayRow];

        //update the score
        var score = document.getElementById("score").textContent;
        score = score + 10;
        document.getElementById("score").innerHTML = score;
    };
    

};



// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//player object and its properties
var Player = function (x,y) {
    this.x = x;
    this.y = y;
    this.player = 'images/char-cat-girl.png';
}

Player.prototype.update = function () {

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

//declaring the variables for gems locations
var locationColumn = [0, 100, 200, 300, 400, 200, 100]; 
var locationRow = [0, 120, 220, 320, 420, 220, 320]; 
var columnNum;
var arrayCol;
var rowNum;
var arrayRow;

//calculates a random location for the gem
function randFunc(){
    columnNum = Math.round(Math.random() * 10);
    rowNum = Math.round(Math.random() * 10);
    if(columnNum <= 5){
        arrayCol = columnNum;
    }
    else{
        arrayCol = columnNum - 5;
    }
    if(rowNum <= 4){
        arrayRow = rowNum;
    }
    else{
        arrayRow = rowNum - 5;
    }

};

randFunc();


var Gems = function() {
    this.x = locationColumn[arrayCol];
    this.y = locationRow[arrayRow];
    this.gems = 'images/Gem Blue.png';
} 


Gems.prototype.render = function () {
         ctx.drawImage(Resources.get(this.gems), this.x, this.y);
};  


Gems.prototype.reset = function(){
    
    randFunc();
    gem.x = locationColumn[arrayCol];
    gem.y = locationRow[arrayRow];
};

// Place all enemy objects in an array called allEnemies
var allEnemies = [];

//setting enemy locations Y-axis
var enemyLocation = [63, 147, 230];

enemyLocation.forEach(function (locationY) {
    enemy = new Enemy(0, locationY, 200);
    allEnemies.push(enemy); //push into allEnemies array
});

// Place the player object in a variable called player
var player = new Player(202, 405);
var gems = new Gems();



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
