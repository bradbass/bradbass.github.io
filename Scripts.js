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
var myObstacles = [];
var myscore;

function restartGame() {
    //clear everything so we can start a new game
    myGameArea.stop();
    myGameArea.clear();
    myGameArea = {};
    myGamePiece = {};
    myObstacles = [];
    myscore = {};
    document.getElementById("canvasContainer").innerHTML = "";
    startGame()
}

function startGame() {
    //create gamearea, gamepiece and scoreboard and then start the game
    myGameArea = new gamearea();
    myGamePiece = new component(30, 30, "red", 10, 75);
    myscore = new component("15px", "Consolas", "black", 220, 25, "text");
    myGameArea.start();
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

function component(width, height, color, x, y, type) {
    //draw the game piece, update position and check for collisions
    this.type = type;
    if (type == "text") {
        this.text = color;
    }
    this.score = 0;    this.width = width;
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
    //collision detection
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

function updateGameArea() {
    //draw the game area and obstacles
    var x, y, min, max, height, gap;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop();
            document.getElementById("myfilter").style.display = "block";
            document.getElementById("myrestartbutton").style.display = "block";
            return;
        } 
    }
    if (myGameArea.pause == false) {
        myGameArea.clear();
        myGameArea.frameNo += 1;
        myscore.score +=1;        
        if (myGameArea.frameNo == 1 || everyinterval(150)) {
            x = myGameArea.canvas.width;
            y = myGameArea.canvas.height - 100;
            min = 20;
            max = 100;
            height = Math.floor(Math.random()*(max-min+1)+min);
            min = 50;
            max = 100;
            gap = Math.floor(Math.random()*(max-min+1)+min);
            myObstacles.push(new component(10, height, "green", x, 0));
            myObstacles.push(new component(10, x - height - gap, "green", x, height + gap));
        }
        for (i = 0; i < myObstacles.length; i += 1) {
            myObstacles[i].x += -1;
            myObstacles[i].update();
        }
        myscore.text="SCORE: " + myscore.score;        
        myscore.update();
        myGamePiece.x += myGamePiece.speedX;
        myGamePiece.y += myGamePiece.speedY;    
        myGamePiece.update();
    }
}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) {return true;}
    return false;
}

function btnUp(e) {
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

function clearMove(e) {
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
