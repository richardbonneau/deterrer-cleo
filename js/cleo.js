//  Widths and Heights
var GAME_WIDTH = 450;
var GAME_HEIGHT = 500;

var PLAYER_WIDTH = 40;
var PLAYER_HEIGHT = 80;

var ENEMY_WIDTH = 75;
var ENEMY_HEIGHT = 75;
var MAX_ENEMIES = 1;

var ANVIL_WIDTH = 75;
var ANVIL_HEIGHT = 35;
var MAX_ANVILS = 1;

var BOX_WIDTH = 50;
var BOX_HEIGHT = 70;
var MAX_BOXES = 1;

var BONE_WIDTH = 75;
var BONE_HEIGHT = 100;
var MAX_BONES = 1;

var FOOD_WIDTH = 75;
var FOOD_HEIGHT = 100;
var MAX_FOODS = 1;

var PLANE_WIDTH = 145;
var PLANE_HEIGHT = 50;
var MAX_PLANES = 1;


//  Start and Finish
var BARN_WIDTH = 450;
var BARN_HEIGHT = 125;
var PARADISE_WIDTH = 450;
var PARADISE_HEIGHT = 300;

var barnStart = false;
var paradiseStart = false;

var didPlayerWinGame = false;


//  Levels
var level0 = true;
var level1 = false;
var level2 = false;
var level3 = false;
var level4 = false;


//  Player Movement
var playerMoveLeft = false;
var playerMoveRight = false;
var playerMoveUp = false;
var playerMoveDown = false;

const MOVE_LEFT = 'left';
const MOVE_RIGHT = 'right';
const MOVE_UP = 'up';
const MOVE_DOWN = 'down';

var LEFT_ARROW_CODE = 37;
var RIGHT_ARROW_CODE = 39;
var UP_ARROW_CODE = 38;
var DOWN_ARROW_CODE = 40;


//  Points Display
var displayPoints = false;
var points = 0;
var pointsLocationX = 0;
var pointsLocationY = 0;

//  Preload game images
var images = {};
[
    "level.png", "barn.png", "paradise.png",

    "player.png",

    "bouffe-parachute.png", "bone-parachute.png", "tuque.png",

    "bombe-parachute.png", "spike-parachute.png", "anvil.png", "box.png",

    "boule-neige.png", "plane-right.png", "plane-left.png",

].forEach(imgName => {
    var img = document.createElement('img');
    img.src = 'images/' + imgName;
    images[imgName] = img;
});



// This section is where you will be doing most of your coding
class Player {
    constructor() {
        this.x = 4 * PLAYER_WIDTH;
        this.y = GAME_HEIGHT - PLAYER_HEIGHT - 5;
        this.sprite = images['player.png'];
        this.speed = 0.2;
    }
    // This method is called by the game engine when left/right arrows are pressed
    move(direction) {
        if (direction === MOVE_LEFT) {
            playerMoveLeft = true;
        } else if (direction === MOVE_RIGHT) {
            playerMoveRight = true;
        } else if (direction === MOVE_UP) {
            playerMoveUp = true;
        } else if (direction === MOVE_DOWN) {
            playerMoveDown = true;
        }
    }
    updateHorizontal(timeDiff) {
        this.x = this.x + timeDiff * this.speed;
    }
    updateVertical(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}
class Anvil {
    constructor(xPos) {
        this.x = xPos;
        this.y = -ANVIL_HEIGHT;
        this.sprite = images['anvil.png'];

        // Each enemy should have a different speed
        this.speed = Math.random() / 2 + 0.2;
    }
    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Box {
    constructor(xPos) {
        this.x = xPos;
        this.y = -BOX_HEIGHT;
        this.sprite = images['box.png'];
        this.speed = Math.random() / 2 + 0.15;
    }
    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Plane {
    constructor(yPos, spawnLeft) {
        this.x = spawnLeft ? -PLANE_WIDTH : GAME_WIDTH + PLANE_WIDTH;
        this.y = yPos;
        this.sprite = spawnLeft ? images['plane-right.png'] : images['plane-left.png'];
        this.horizontalSpeed = Math.random() / 2 + 0.10;
        this.verticalSpeed = (Math.random() - 0.5) / 10;
    }
    update(timeDiff) {
        this.y = this.y + timeDiff * this.verticalSpeed;
        this.x = this.x + timeDiff * this.horizontalSpeed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}

class Bone {
    constructor(xPos) {
        this.x = xPos;
        this.y = -BONE_HEIGHT;
        this.sprite = images['bone-parachute.png'];
        this.speed = Math.random() / 2 + 0.15;
    }
    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }
    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}


class Barn {
    constructor() {
        this.x = 0;
        this.y = GAME_HEIGHT - BARN_HEIGHT;
        this.sprite = images['barn.png'];
        this.speed = 0.05;
    }

    // This method is called by the game engine when left/right arrows are pressed

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}
class Paradise {
    constructor() {
        this.x = 0;
        this.y = 0 - PARADISE_HEIGHT;
        this.sprite = images['paradise.png'];
        this.speed = 0.1;
    }

    update(timeDiff) {
        this.y = this.y + timeDiff * this.speed;
    }

    render(ctx) {
        ctx.drawImage(this.sprite, this.x, this.y);
    }
}



/*
This section is a tiny game engine.
This engine will use your Enemy and Player classes to create the behavior of the game.
The engine will try to draw your game at 60 frames per second using the requestAnimationFrame function
*/
class Engine {
    constructor(element) {
        // Setup the player
        this.player = new Player();
        this.barn = new Barn();
        this.paradise = new Paradise();
        

        // Setup enemies, making sure there are always three
        this.setupAnvils();
        this.setupBoxes();
        this.setupPlanes();

        this.setupBones();

        // Setup the <canvas> element where we will be drawing
        var canvas = document.createElement('canvas');
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;
        element.appendChild(canvas);

        this.ctx = canvas.getContext('2d');

        // Since gameLoop will be called out of context, bind it once here.
        this.gameLoop = this.gameLoop.bind(this);
    }

    /*
     The game allows for 5 horizontal slots where an enemy can be present.
     At any point in time there can be at most MAX_ENEMIES enemies otherwise the game would be impossible
     */
    setupAnvils() {
        if (!this.anvils) {
            this.anvils = [];
        }

        while (this.anvils.filter(e => !!e).length < MAX_ANVILS) {
            this.addAnvil();
        }
    }

    setupBoxes() {
        if (!this.boxes) {
            this.boxes = [];
        }

        while (this.boxes.filter(e => !!e).length < MAX_BOXES) {
            this.addBox();
        }
    }

    setupPlanes() {
        if (!this.leftPlanes) {
            this.leftPlanes = [];
        }
        //  TODO: ajouter right planes fait crasher le jeu
        // if (!this.rightPlanes) {
        //     this.rightPlanes = [];
        // }

        while (this.leftPlanes.filter(e => !!e).length < MAX_PLANES) {
            this.addPlane();
        }
        // while (this.rightPlanes.filter(e => !!e).length < MAX_PLANES) {
        //     this.addPlane();
        // }
    }

    setupBones() {
        if (!this.bones) {
            this.bones = [];
        }

        while (this.bones.filter(e => !!e).length < MAX_BONES) {
            this.addBone();
        }
    }

    // This method finds a random spot where there is no enemy, and puts one in there
    addAnvil() {
        var anvilSpots = GAME_WIDTH / ANVIL_WIDTH;

        var anvilSpot;
        // Keep looping until we find a free enemy spot at random
        while (anvilSpot === undefined || this.anvils[anvilSpot]) {
            anvilSpot = Math.floor(Math.random() * anvilSpots);
        }

        this.anvils[anvilSpot] = new Anvil(anvilSpot * ANVIL_WIDTH);
    }

    addBox() {
        var boxSpots = GAME_WIDTH / BOX_WIDTH;

        var boxSpot;
        // Keep looping until we find a free enemy spot at random
        while (boxSpot === undefined || this.boxes[boxSpot]) {
            boxSpot = Math.floor(Math.random() * boxSpots);
        }

        this.boxes[boxSpot] = new Box(boxSpot * BOX_WIDTH);
    }

    addPlane() {
        var leftPlaneSpots = GAME_HEIGHT / PLANE_HEIGHT;

        var leftPlaneSpot;
        // Keep looping until we find a free spot at random
        while (leftPlaneSpot === undefined || this.leftPlanes[leftPlaneSpot]) {
            leftPlaneSpot = Math.floor(Math.random() * leftPlaneSpots);
        }
        this.leftPlanes[leftPlaneSpot] = new Plane(leftPlaneSpot * PLANE_HEIGHT, true);

        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //  TODO: ajouter right planes fait crasher le jeu
        // var rightPlaneSpots = GAME_HEIGHT / PLANE_HEIGHT;

        // var rightPlaneSpot;
        // // Keep looping until we find a free spot at random
        // while (rightPlaneSpot === undefined || this.rightPlanes[rightPlaneSpot]) {
        //     rightPlaneSpot = Math.floor(Math.random() * rightPlaneSpots);
        // }
        // this.rightPlanes[rightPlaneSpot] = new Plane(rightPlaneSpot * PLANE_HEIGHT, false);
    }

    addBone() {
        var boneSpots = GAME_WIDTH / BONE_WIDTH;

        var boneSpot;
        // Keep looping until we find a free enemy spot at random
        while (boneSpot === undefined || this.bones[boneSpot]) {
            boneSpot = Math.floor(Math.random() * boneSpots);
        }

        this.bones[boneSpot] = new Bone(boneSpot * BONE_WIDTH);
    }

    stopScrollingLevel() {
        document.getElementById("background").style.animationPlayState = "paused"
    }

    // This method kicks off the game
    start() {
        this.score = 0;
        this.lastFrame = Date.now();


        // Listen for keyboard left/right and update the player
        document.addEventListener('keydown', down => {
            if (down.keyCode === LEFT_ARROW_CODE) {
                this.player.move(MOVE_LEFT);
            } else if (down.keyCode === RIGHT_ARROW_CODE) {
                this.player.move(MOVE_RIGHT);
            } else if (down.keyCode === UP_ARROW_CODE) {
                this.player.move(MOVE_UP);
            } else if (down.keyCode === DOWN_ARROW_CODE) {
                this.player.move(MOVE_DOWN);
            }

        });
        document.addEventListener("keyup", up => {
            if (up.keyCode === LEFT_ARROW_CODE) {
                playerMoveLeft = false;
            } else if (up.keyCode === RIGHT_ARROW_CODE) {
                playerMoveRight = false;
            } else if (up.keyCode === UP_ARROW_CODE) {
                playerMoveUp = false;
            } else if (up.keyCode === DOWN_ARROW_CODE) {
                playerMoveDown = false;
            }
        })
        // Space
        document.addEventListener("keydown", down => {
            if (down.keyCode === 32) {
                barnStart = true;
                document.getElementById("background").classList.remove("background-start")
                document.getElementById("background").classList.add("background")
            }
        })
        // CTRL
        document.addEventListener("keydown", down => {
            if (down.keyCode === 17) {
                paradiseStart = true;
            }
        })

        //  Levels
        document.addEventListener("keydown", down => {
            if (down.keyCode === 48) {
                level0 = true;
                level1 = false;
                level3 = false;
                level4 = false;
            }
        })


        this.gameLoop();
    }

    /*
    This is the core of the game engine. The `gameLoop` function gets called ~60 times per second
    During each execution of the function, we will update the positions of all game entities
    It's also at this point that we will check for any collisions between the game entities
    Collisions will often indicate either a player death or an enemy kill
 
    In order to allow the game objects to self-determine their behaviors, gameLoop will call the `update` method of each entity
    To account for the fact that we don't always have 60 frames per second, gameLoop will send a time delta argument to `update`
    You should use this parameter to scale your update appropriately
     */
    gameLoop() {
        // Check how long it's been since last frame
        var currentFrame = Date.now();
        var timeDiff = currentFrame - this.lastFrame;

        //  Update the player's positon if needed
        if (playerMoveLeft === true) {
            this.player.updateHorizontal(-timeDiff);
        } else if (playerMoveRight === true) {
            this.player.updateHorizontal(timeDiff);
        }
        if (playerMoveUp === true) {
            if (playerMoveLeft || playerMoveRight) this.player.updateVertical(-timeDiff / 1.5);
            else this.player.updateVertical(-timeDiff);
        } else if (playerMoveDown === true) {
            if (playerMoveLeft || playerMoveRight) this.player.updateVertical(timeDiff / 1.5);
            else this.player.updateVertical(timeDiff);
        }



        //  Checks if we're at the start or end of the level
        if (barnStart === true) {
            this.barn.update(timeDiff);
        }
        if (paradiseStart === true) {
            this.paradise.update(timeDiff);
            if (this.paradise.y >= 0) {
                didPlayerWinGame = true;
            }
        }

        // Score
        this.score += timeDiff;

        this.pointDisplay()

        // Call update on all game elements
        this.anvils.forEach(anvil => anvil.update(timeDiff));
        this.boxes.forEach(box => box.update(timeDiff));
        this.leftPlanes.forEach(plane => plane.update(timeDiff));
        this.bones.forEach(bone => bone.update(timeDiff));
        // Draw everything!
        this.ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.anvils.forEach(anvil => anvil.render(this.ctx));
        this.boxes.forEach(box => box.render(this.ctx));
        this.leftPlanes.forEach(plane => plane.render(this.ctx));
        this.bones.forEach(bone => bone.render(this.ctx));
        this.barn.render(this.ctx);
        this.paradise.render(this.ctx);
        this.player.render(this.ctx);


        // Check if any enemies should die
        this.anvils.forEach((anvil, anvilIdx) => {
            if (anvil.y > GAME_HEIGHT || paradiseStart) {
                delete this.anvils[anvilIdx];
            }
        });
        this.boxes.forEach((box, boxIdx) => {
            if (box.y > GAME_HEIGHT || paradiseStart) {
                delete this.boxes[boxIdx];
            }
        });
        this.leftPlanes.forEach((plane, planeIdx) => {
            if (plane.x > GAME_WIDTH || paradiseStart) {
                delete this.leftPlanes[planeIdx];
            }
        });
        this.bones.forEach((bone, boneIdx) => {
            if (bone.y > GAME_HEIGHT || paradiseStart) {
                delete this.bones[boneIdx];
            }
        });
        this.setupAnvils();
        this.setupBoxes();
        this.setupPlanes();
        this.setupBones();

        //  Check if the player picked up bones
        if(this.didPlayerPickUpFood()) {
            console.log("animation points++")
        }


        // Check if player is dead
        if (this.isPlayerDead()) {
            // If they are dead, then it's game over!
            this.ctx.font = 'bold 30px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score + ' GAME OVER', 5, 30);
        }
        else if (didPlayerWinGame) {
            this.stopScrollingLevel()
        }
        else {
            // If player is not dead, then draw the score
            this.ctx.font = 'bold 30px Impact';
            this.ctx.fillStyle = '#ffffff';
            this.ctx.fillText(this.score, 5, 30);

            // Set the time marker and redraw
            this.lastFrame = Date.now();
            requestAnimationFrame(this.gameLoop);
        }
    }

    didPlayerPickUpFood() {
        //  TODO: changer this.enemies par this.bouffe or something
        for (let i = 0; i < this.bones.length; i++) {

            if (this.bones[i] == undefined) continue;
            
            else if (
                this.bones[i].x < this.player.x + PLAYER_WIDTH &&
                this.bones[i].x + BONE_WIDTH > this.player.x &&
                this.bones[i].y < this.player.y + PLAYER_HEIGHT &&
                this.bones[i].y + BONE_HEIGHT > this.player.y) {

                pointsLocationX = this.bones[i].x;
                pointsLocationY = this.bones[i].y;
                points = 1000;
                displayPoints = true;

                delete this.bones[i]
                //  launch a function that will take the current coordinate and display score++ for a short amount of time
                
                return true;
            }
        }
        return false;
    }

    pointDisplay() {
        
        if(displayPoints) {
            console.log(points, pointsLocationX, pointsLocationY)
            this.ctx.fillText(points, pointsLocationX, pointsLocationY);
        }
        
    }

    isPlayerDead() {
        //  anvils
        for (let i = 0; i < this.anvils.length; i++) {
            if (this.anvils[i] == undefined) continue;
            else if (
                this.anvils[i].x < this.player.x + PLAYER_WIDTH &&
                this.anvils[i].x + ANVIL_WIDTH > this.player.x &&
                this.anvils[i].y < this.player.y + PLAYER_HEIGHT &&
                this.anvils[i].y + ANVIL_HEIGHT > this.player.y) {

                //console.log("DEAD")
                // this.stopScrollingLevel()
                // return true;
            }
        }
        //  Planes
        for (let i = 0; i < this.leftPlanes.length; i++) {
            if (this.leftPlanes[i] == undefined) continue;
            else if (
                this.leftPlanes[i].x < this.player.x + PLANE_WIDTH &&
                this.leftPlanes[i].x + PLANE_WIDTH > this.player.x &&
                this.leftPlanes[i].y < this.player.y + PLANE_HEIGHT &&
                this.leftPlanes[i].y + PLANE_HEIGHT > this.player.y) {

                //console.log("DEAD")
                // this.stopScrollingLevel()
                // return true;
            }
        }
        //  Box
        for (let i = 0; i < this.boxes.length; i++) {
            if (this.boxes[i] == undefined) continue;
            else if (
                this.boxes[i].x < this.player.x + BOX_WIDTH &&
                this.boxes[i].x + BOX_WIDTH > this.player.x &&
                this.boxes[i].y < this.player.y + BOX_HEIGHT &&
                this.boxes[i].y + BOX_HEIGHT > this.player.y) {

                //console.log("DEAD")
                // this.stopScrollingLevel()
                // return true;
            }
        }


        return false;
    }
}





// This section will start the game
var gameEngine = new Engine(document.getElementById('app'));
gameEngine.start();