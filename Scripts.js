function submitcontact() {
    // do something.
    var name = document.getElementById('contactname').value;
    var email = document.getElementById('contactemail').value;
    var subject = document.getElementById('contactsubject').value;
    var msg = document.getElementById('contactmsg').value;

    var body = name + "\n\n" + email + "\n\n" + msg;

    var request = 'mailto:brad.bass@hotmail.ca?subject=' + subject + '&body=' + body;

    window.open(request);
}

var myGameArea;
var myGamePiece;

function startGame() {
    //create gamearea, gamepiece and scoreboard and then start the game
    myGameArea = new gamearea();
    myGamePiece = new component(30, 30, "red", 2, 2);
    myGameArea.start();
}

function restartGame() {
    myGameArea.stop();
    myGameArea.clear();
    myGameArea = {};
    myGamePiece = {};
    document.getElementById("canvasContainer").innerHTML = "";
    startGame()
}

function gamearea() {
    //create the game area
    this.canvas = document.createElement("canvas");
    this.canvas.width = 320;
    this.canvas.height = 180;
    this.canvas.id = "canvas";    
    document.getElementById("canvasContainer").appendChild(this.canvas);
    this.context = this.canvas.getContext("2d");
    this.pause = false;
    this.frameNo = 0;
    this.start = function() {
        this.interval = setInterval(updateGameArea, 20);
    }
    this.stop = function() {
        clearInterval(this.interval);
        this.pause = true;
    }
    this.clear = function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

document.onkeydown = async function getKeyPress() {
    // get key pressed by user.  If its an arrow key or wasd then move the gamepiece.
    var key = event.key;
    if (key == "ArrowUp" || key == "w") {
        btnUp();
    } else if (key == "ArrowDown" || key == "s") {
        btnDown();
    } else if (key == "ArrowLeft" || key == "a") {
        btnLeft();
    } else if (key == "ArrowRight" || key == "d") {
        btnRight();
    }
}

document.onkeyup = async function stopMoving() {
    //reset gamepiece speed when unclick button
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0;
}

function drawMaze() {
    //draw the maze
    var myCanvas = document.getElementById("canvas");
    ctx = myCanvas.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(40, 0);
    ctx.lineTo(40, 80);
    ctx.lineTo(80, 80);
    ctx.lineTo(80, 120);
    ctx.moveTo(40,180);
    ctx.lineTo(40, 120);
    ctx.moveTo(80, 180);
    ctx.lineTo(80, 160);
    ctx.moveTo(120, 180);
    ctx.lineTo(120, 40);
    ctx.lineTo(80, 40);
    ctx.moveTo(160, 0);
    ctx.lineTo(160, 120);
    ctx.lineTo(200, 120);
    ctx.lineTo(200, 140)
    ctx.moveTo(160, 180);
    ctx.lineTo(160, 160);
    ctx.moveTo(240, 180);
    ctx.lineTo(240, 80);
    ctx.lineTo(200, 80);
    ctx.lineTo(200, 40);
    ctx.moveTo(240, 0);
    ctx.lineTo(240, 40);
    ctx.moveTo(280, 0);
    ctx.lineTo(280, 140);
    ctx.strokeStyle = "red";
    ctx.stroke();
}

function component(width, height, color, x, y, type) {
    //draw the game piece, update position and check for collisions
    this.type = type;
    if (type == "text") {
        this.text = color;
    }  
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    var myleft = this.x;
    var myright = this.x + (this.width);
    var mytop = this.y;
    var mybottom = this.y + (this.height);
    // if ((mybottom >= this.canvas.height) || (mytop <= 0) || (myright >= this.canvas.width) || (myleft <= 0)) {
    //     restartGame();
    // }
}

function updateGameArea() {
    //draw the game area
    var x, y, min, max, height, gap;
    if (myGameArea.pause == false) {
        myGameArea.clear();
        myGameArea.frameNo += 1;      
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            y = myGameArea.canvas.height - 100;
            min = 20;
            max = 100;
            height = Math.floor(Math.random()*(max-min+1)+min);
            min = 50;
            max = 100;
            gap = Math.floor(Math.random()*(max-min+1)+min);
        }
        myGamePiece.x += myGamePiece.speedX;
        myGamePiece.y += myGamePiece.speedY;    
        myGamePiece.update();        
        drawMaze();
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function btnUp() {
    //move gamepiece up
    myGamePiece.speedY = -1; 
}

function btnDown() {
    //move gamepiece down
    myGamePiece.speedY = 1; 
}

function btnLeft() {
    //move gamepiece left
    myGamePiece.speedX = -1; 
}

function btnRight() {
    //move gamepiece right
    myGamePiece.speedX = 1; 
}

function clearMove() {
    //reset gamepiece speed when unclick button
    myGamePiece.speedX = 0; 
    myGamePiece.speedY = 0; 
}
startGame();

function popAlert() {
    alert("Hello, World!");
}

function writeText() {
    //function to animate the code on the home page
    var textBox = document.getElementById("homePageCode");
}

function show_image(src, width, height, alt) {
    var img = document.createElement("img");
    img.src = src;
    img.width = width;
    img.height = height;
    document.body.appendChild(img);
}

function gpslookup() {
	var messageDiv =
            document.getElementById('message');
        function initLocation() {
            var geolocation = navigator.geolocation;
            if (geolocation) {
                try {
                    navigator.geolocation.getCurrentPosition(
                        successCallback,
                        errorCallback
                    );
                } catch (err) {
                    messageDiv.innerHTML = 'Error';
                }
            } else {
                messageDiv.innerHTML = 'Your browser does not support geolocation.';
            }
        }
        function successCallback(location) {
            message.innerHTML = "<p>Latitude: " +
                location.coords.latitude + "</p>";
            message.innerHTML += "<p>Longitude: " +
                location.coords.longitude + "</p>";
        }
        function errorCallback() {
            messageDiv.innerHTML = 'There was an error looking up your position';
        }	
}
