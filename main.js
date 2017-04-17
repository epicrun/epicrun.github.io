var gravity = 0;
var positionY = 500;
var positionX = 0;
var finalPosition = 0;
var movement = 1000;
var jumpPosition = 0;
var score = 0;
var highscore = 0;
var jumping = false;
var grounded = false;
var jumps = 2;
var level3 = [];
var level2 = [];
var level =	[];
var portal = [];
var started = false;
var respawning = false;
var leftAmt = 0;
var runGravityCheck = false;
var playedRespawnSound = false;
var opened = false;
var generateRunOnce = false;
var passes = 0;
var paused = false;

//moves player and collision to fit window
function SetPosition(){
	var ratio = window.innerWidth / window.innerHeight;
	leftAmt = ratio/0.005;
	document.getElementById("player").style.left=ratio/0.005 + "px";
	
	//if the game hasnt started move the starting block to match the players position
	if(started == false){
		if(document.getElementById("startBlock") != null){
			document.getElementById("startBlock").style.left=ratio/0.005 + "px";
		}
	}
	
	if(ratio < 1.236){
		document.getElementById("tutorial").innerHTML="Tap to start";
	} else {
		document.getElementById("tutorial").innerHTML="Click or space to start";
	}
}

window.addEventListener('resize', function(){
	SetPosition();
	location.reload();
});

//checks the window size and renders the level
SetPosition();
renderStart();
renderLevel();
//renders the big block at start (visual only)
function renderStart(){
	var y = document.createElement("div");
	y.style.left=leftAmt + "px";
	y.style.top=750 + "px";
	y.style.width=parseInt(leftAmt/75)+7.5*75 + "px";
	y.style.borderColor="white";
	y.style.opacity=0;
	y.style.zIndex=2;
	y.className="block";
	y.id="startBlock";
	var blocks = document.getElementById("blocks");
	blocks.appendChild(y);
}
console.log(parseInt(leftAmt/75));
//renders the blocks
function renderLevel(){
	//starting platforms up to player
	for(var i=0;i<parseInt(leftAmt/75);i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		portal.push(0);
	}
	//one block for portal
	for(var i=0;i<1;i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		//no portal on first level
		if(score >= 1){
			portal.push(1);
			console.log("xD");
		} else {
			portal.push(0);
		}
	}
	//rest of the starting blocks
	for(var i=0;i<7;i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		portal.push(0);
	}
	//random part
	for(var i=0;i<26;i++){
		level3.push(Math.floor(Math.random() * 10));
		level2.push(Math.floor(Math.random() * 5));
		level.push(Math.floor(Math.random() * 3));
		portal.push(0);
	}
	//flat for transitioning to next level
	for(var i=0;i<1;i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		portal.push(0);
	}
	//portal
	for(var i=0;i<1;i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		portal.push(1);
	}
	
	for(i=0;i<level3.length;i++){
		if(level3[i] == 1){
			var y = document.createElement("div");
			y.style.left=75*[i]+"px";
			y.style.top=650 + "px";
			y.style.opacity=0;
			y.className="block";
			var blocks = document.getElementById("blocks");
			blocks.appendChild(y);
		}
	}
	for(i=0;i<level2.length;i++){
		if(level2[i] == 1){
			var y = document.createElement("div");
			y.style.left=75*[i]+"px";
			y.style.top=700 + "px";
			y.style.opacity=0;
			y.className="block";
			var blocks = document.getElementById("blocks");
			blocks.appendChild(y);
		}
	}

	for(i=0;i<level.length;i++){
		if(level[i] == 1){
			var y = document.createElement("div");
			y.style.left=75*[i]+"px";
			y.style.top=750 + "px";
			y.style.opacity=0;
			y.className="block";
			var blocks = document.getElementById("blocks");
			blocks.appendChild(y);
		}
	}
	
	for(i=0;i<portal.length;i++){
		if(portal[i] == 1){
			var y = document.createElement("div");
			y.style.left=75*[i]+50+"px";
			y.style.top=550 + "px";
			y.style.opacity=0;
			y.style.backgroundImage="url('portal.png')";
			y.style.backgroundSize="100% 100%";
			y.style.width="50px";
			y.style.height="200px";
			y.style.borderWidth="0px";
			y.className="block";
			var blocks = document.getElementById("blocks");
			blocks.appendChild(y);
		}
	}
}

function Jump(){
	started = true;
	if(jumps >= 1){
		gravity = -1;
		jumpPosition = positionY - 140;
		jumping = true;
		grounded = false;
		jumps--;
		var jumpSound = new Audio('jump.wav');
		jumpSound.play();
	} else {
		var cantJumpSound = new Audio('cantJump.wav');
		cantJumpSound.play();
	}
}

window.setInterval(function(){
	if(paused == false){
		document.title = "epic run | score: " + score;
		//fade in start
		if(document.getElementById("startBlock") != null){
			document.getElementById("startBlock").style.opacity = parseFloat(document.getElementById("startBlock").style.opacity) + 0.05/5;
		}
		if(document.getElementById("player").style.opacity < 1){
			document.getElementById("player").style.opacity = parseFloat(document.getElementById("player").style.opacity) + 0.05/5;
		}
		document.getElementById("tutorial").style.opacity = 0.5;
		document.getElementById("highscore").style.opacity = 0.5;
		document.getElementById("highscoreText").style.opacity = 0.5;
		document.getElementById("openGames").style.opacity = 0.5;
		document.getElementById("title").style.opacity = 0.5;
		
		if(started == true){
			positionX += 1.5;
			document.getElementById("tutorial").style.opacity = 0;
				
			for(var i=0;i<document.getElementsByClassName("block").length;i++){
				var selectedBlock = document.getElementsByClassName("block")[i];
				selectedBlock.style.borderColor=levelColour;
				var leftFloat = parseFloat(selectedBlock.style.left, 10);
				selectedBlock.style.left=leftFloat - 1.5 + "px";
				
				if (leftFloat < leftAmt-20){
						selectedBlock.style.opacity = parseFloat(selectedBlock.style.opacity) - 0.01/5;
				}
					
				//opacity changes for blocks
				if(respawning == false){
					if (leftFloat <= leftAmt+20 && leftFloat >= leftAmt-20){	
						selectedBlock.style.opacity = parseFloat(selectedBlock.style.opacity) + 0.1/5;
					} else if (leftFloat < leftAmt-20){
						selectedBlock.style.opacity = parseFloat(selectedBlock.style.opacity) - 0.01/5;
					} else if (leftFloat > leftAmt+20 && leftFloat < leftAmt*3.5+500){
						selectedBlock.style.opacity = parseFloat(selectedBlock.style.opacity) + 0.003/5;
					}
				}
				
				//deletes when off screen
				if(leftFloat < -500){
					selectedBlock.outerHTML = "";
				}
			}
		}
		
		if(jumping == true){
			if(positionY > jumpPosition){
				positionY = positionY - 1;
			} else {
				jumping = false;
			}
		}
		
		if(jumps == 2){
			document.getElementById("jump1").style.opacity = 1;
			document.getElementById("jump2").style.opacity = 1;
		} else if (jumps == 1){
			document.getElementById("jump1").style.opacity = 1;
			document.getElementById("jump2").style.opacity = 0;
		} else if (jumps == 0){
			document.getElementById("jump1").style.opacity = 0;
			document.getElementById("jump2").style.opacity = 0;
		}

		var currentBlock = parseInt(positionX/75+leftAmt/75);
		if(level[currentBlock] == 1 && positionY >= 700 && positionY <= 710 && gravity >= 0 || level2[currentBlock] == 1 && positionY >= 650 && positionY <= 660 && gravity >= 0 || level3[currentBlock] == 1 && positionY >= 600 && positionY <= 610 && gravity >= 0){
			grounded = true;
			gravity = 1.1;
		} else {
			grounded = false;	
		}
		
		if(grounded == false){
			gravity += 0.02;
			positionY = positionY + gravity;
			positionY = Math.round(positionY * 100) / 100;
			document.getElementById("player").style.top=positionY + "px";
		} else {
			jumps = 2;
		}
		
		if(positionY >= 890 || positionY <= 10){
			Respawn();
		}
		
		if(positionX >= 500 && respawning == false || passes > 0){
			score = currentBlock-leftAmt/75;
			score = parseInt(score/7);
			score = passes * 5 + score;
			document.getElementById("score").style.opacity = 0.5;
		}
		
		if(score > highscore){
			highscore = score;
		}
		
		if(score < 5){
			levelColour = "white";
			document.getElementById("background").style.backgroundColor="black";
		} else if(score >= 5 && score < 10){
			levelColour = "green";
			document.getElementById("background").style.backgroundColor=levelColour;
		} else if(score >= 10 && score < 15){
			levelColour = "yellow";
			document.getElementById("background").style.backgroundColor=levelColour;
		} else if(score >= 15 && score < 20){
			levelColour = "cyan";
			document.getElementById("background").style.backgroundColor=levelColour;
		} else if(score >= 20 && score < 25){
			levelColour = "blue";
			document.getElementById("background").style.backgroundColor=levelColour;
		} else if(score >= 25 && score < 30){
			levelColour = "#9000ff";
			document.getElementById("background").style.backgroundColor=levelColour;
		} else if(score >= 30 && score < 35){
			levelColour = "fuchsia";
			document.getElementById("background").style.backgroundColor=levelColour;
		} else if(score >= 35 && score < 40){
			levelColour = "orange";
			document.getElementById("background").style.backgroundColor=levelColour;
		} else if(score >= 40 && score < 45){
			levelColour = "red";
			document.getElementById("background").style.backgroundColor=levelColour;
		}
		
		
		if(score > 1){
			if(score % 5 == 0){
				if(generateRunOnce == false){
					GenerateMore();
					generateRunOnce = true;
				}
			} else {
				generateRunOnce = false;
			}
		}
		
		document.getElementById("score").innerHTML = score;
		document.getElementById("highscore").innerHTML = highscore;
	} else {
		document.title = "New Tab";
		
	}
}, 5);

function GenerateMore(){
		positionX = 0;
		level =	[];
		level2 = [];
		level3 = [];
		portal = [];
		document.getElementById("blocks").innerHTML="";
		passes++;
		renderLevel();
		var portalSound = new Audio('portal.wav');
		portalSound.play();
}

function Respawn(){
	respawning = true;
	document.getElementById("score").style.opacity=0;
	if(playedRespawnSound == false){
		var respawnSound = new Audio('respawn.wav');
		respawnSound.play();
		playedRespawnSound = true;
	}
	document.getElementById("player").style.opacity=0;
	for(var i=0;i<document.getElementsByClassName("block").length;i++){
		var selectedBlock = document.getElementsByClassName("block")[i];
		if(selectedBlock.style.opacity > 0){
			selectedBlock.style.opacity=parseFloat(selectedBlock.style.opacity) - 0.05/5;
		}
	}
	setTimeout(function (){
		positionY = 500;
		jumps = 2;
		passes = 0;
		positionX = 0;
		gravity = 0;
		score = 0;
		level =	[];
		level2 = [];
		level3 = [];
		portal = [];
		document.getElementById("blocks").innerHTML="";
		levelColour = "white";
		renderLevel();
		renderStart();
		respawning = false;
		playedRespawnSound = false;
	}, 750);
}

function OpenGames(){
	if(opened == false){
		document.getElementById("game1").style.left="55vw";
		document.getElementById("game1").style.opacity=0.5;
		document.getElementById("game2").style.right="55vw";
		document.getElementById("game2").style.opacity=0.5;
		document.getElementById("closeGames").style.opacity = 0.5;
		document.getElementById("closeGames").style.transitionDelay = "0.3s";
		document.getElementById("closeGames").style.pointerEvents = "auto";
		opened = true;
	} else {
		document.getElementById("game1").style.left="-2vw";
		document.getElementById("game1").style.opacity=0;
		document.getElementById("game2").style.right="-2vw";
		document.getElementById("game2").style.opacity=0;
		document.getElementById("closeGames").style.opacity = 0;
		document.getElementById("closeGames").style.transitionDelay = "0s";
		document.getElementById("closeGames").style.pointerEvents = "none";
		opened = false;

	}
}

function Save(){
	var save = {
		'highscore': highscore
	}
	localStorage.setItem("save",JSON.stringify(save));
}
	
function Load(){
	if(localStorage.getItem("save") !== null){
		var savegame = JSON.parse(localStorage.getItem("save"));
		if (typeof savegame.highscore !== "undefined") highscore = savegame.highscore;
	}
}

function Pause(){
	if(paused == false){
		paused = true;
		document.getElementById("overlay").style.opacity=0.8;
		document.getElementById("overlay").style.zIndex=9999;
	} else {
		paused = false;
		document.getElementById("overlay").style.opacity=0;
		document.getElementById("overlay").style.zIndex=9999999;
	}
}

window.onbeforeunload = function(){
	Save();
}

Load();

document.body.onkeydown = function(e){
	//space
    if(e.keyCode == 32){
		if(paused == false){
			Jump();
		}
    }
	//space
    if(e.keyCode == 27){
		if(paused == false){
			paused = true;
			document.getElementById("paused").style.opacity=1;
			document.getElementById("overlay").style.opacity=0.8;
			document.getElementById("overlay").style.zIndex=9999999;
		} else {
			paused = false;
			document.getElementById("paused").style.opacity=0;
			document.getElementById("overlay").style.opacity=0;
			document.getElementById("overlay").style.zIndex=9999999;

			if(opened == true){
				document.getElementById("game1").style.left="-2vw";
				document.getElementById("game1").style.opacity=0;
				document.getElementById("game2").style.right="-2vw";
				document.getElementById("game2").style.opacity=0;
				document.getElementById("closeGames").style.opacity = 0;
				document.getElementById("closeGames").style.transitionDelay = "0s";
				document.getElementById("closeGames").style.pointerEvents = "none";
				opened = false;

			}
		}
    }
}