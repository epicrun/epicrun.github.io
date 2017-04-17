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
var level =	[];
var level2 = [];
var level3 = [];
var portal = [];
var coinlevel = [];
var coinlevel2 = [];
var started = false;
var respawning = false;
var leftAmt = 0;
var runGravityCheck = false;
var playedRespawnSound = false;
var opened = false;
var generateRunOnce = false;
var passes = 0;
var paused = false;
var coins = 0;
var coinsOnLevel = 0;
var coinsOnLevel2 = 0;
var coinBlock = 0;
var coinBlock2 = 0;
var shopOpened = false;
var deleted = false;

//moves player and collision to fit window
function SetPosition(){
	var ratio = window.innerWidth / window.innerHeight;
	leftAmt = ratio/0.005;
	topAmt = parseInt(window.innerHeight*0.789);
	console.log(topAmt);
	document.getElementById("player").style.left=ratio/0.005 + "px";
	positionY = topAmt-200;
	
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
	y.style.top=topAmt + "px";
	y.style.width=parseInt(leftAmt/75)+7.5*75 + "px";
	y.style.borderColor="white";
	y.style.opacity=0;
	y.style.zIndex=2;
	y.className="block";
	y.id="startBlock";
	var blocks = document.getElementById("blocks");
	blocks.appendChild(y);
}

//renders the blocks
function renderLevel(){
	//starting platforms up to player
	for(var i=0;i<parseInt(leftAmt/75);i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		portal.push(0);
		coinlevel.push(0);
		coinlevel2.push(0);
	}
	//one block for portal
	for(var i=0;i<1;i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		//no portal on first level
		if(score >= 1){
			portal.push(1);
		} else {
			portal.push(0);
		}
		coinlevel.push(0);
		coinlevel2.push(0);
	}
	//rest of the starting blocks
	for(var i=0;i<7;i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		portal.push(0);
		coinlevel.push(0);
		coinlevel2.push(0);
	}
	//random part
	for(var i=0;i<26;i++){
		level3.push(Math.floor(Math.random() * 10));
		level2.push(Math.floor(Math.random() * 5));
		level.push(Math.floor(Math.random() * 3));
		portal.push(0);
		coinlevel.push(Math.floor(Math.random() * 10));
		coinlevel2.push(Math.floor(Math.random() * 10));
	}
	//flat for transitioning to next level
	for(var i=0;i<1;i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		portal.push(0);
		coinlevel.push(Math.floor(Math.random() * 10));
		coinlevel2.push(Math.floor(Math.random() * 10));
	}
	//portal
	for(var i=0;i<1;i++){
		level3.push(0);
		level2.push(0);
		level.push(1);
		portal.push(1);
		coinlevel.push(0);
		coinlevel2.push(0);
	}

	for(i=0;i<level.length;i++){
		if(level[i] == 1){
			var y = document.createElement("div");
			y.style.left=75*[i]+"px";
			y.style.top=topAmt + "px";
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
			y.style.top=topAmt-50 + "px";
			y.style.opacity=0;
			y.className="block";
			var blocks = document.getElementById("blocks");
			blocks.appendChild(y);
		}
	}
	
	for(i=0;i<level3.length;i++){
		if(level3[i] == 1){
			var y = document.createElement("div");
			y.style.left=75*[i]+"px";
			y.style.top=topAmt-100 + "px";
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
			y.style.top=topAmt-200 + "px";
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
	
	for(i=0;i<coinlevel.length;i++){
		if(coinlevel[i] == 1){
			var y = document.createElement("div");
			y.style.left=75*[i]+"px";
			y.style.top=topAmt-200 + "px";
			y.style.opacity=0;
			y.style.backgroundImage="url('coin.png')";
			y.style.backgroundSize="100% 100%";
			y.style.borderWidth="0px";
			y.style.zIndex=-1;
			y.style.width="75px";
			y.style.height="75px";
			y.style.borderWidth="0px";
			y.id="coin"
			y.className="coin";
			var blocks = document.getElementById("blocks");
			blocks.appendChild(y);
		}
	}
	
	for(i=0;i<coinlevel2.length;i++){
		if(coinlevel2[i] == 1){
			var y = document.createElement("div");
			y.style.left=75*[i]+"px";
			y.style.top=640 + "px";
			y.style.opacity=0;
			y.style.backgroundImage="url('coin.png')";
			y.style.backgroundSize="100% 100%";
			y.style.zIndex=-1;
			y.style.width="75px";
			y.style.height="75px";
			y.style.borderWidth="0px";
			y.id="coin"
			y.className="coin2";
			var blocks = document.getElementById("blocks");
			blocks.appendChild(y);
		}
	}
}

function Jump(){
	started = true;
	if(paused == false){
		if(jumps >= 1 && respawning == false){
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
}

//set transition on shop button to 0.5s after it initially fades in
setTimeout(function (){
		document.getElementById("shopButton").style.transition = "0.5s";
		document.getElementById("openGames").style.transition = "0.5s";
}, 120);
	
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
		document.getElementById("openGames").style.opacity = 0.8;
		//document.getElementById("title").style.opacity = 0.5;
		document.getElementById("coins").style.opacity = 0.5;
		document.getElementById("coinsText").style.opacity = 0.5;
		document.getElementById("shopButton").style.opacity = 0.8;
		
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
			
			for(var i=0;i<document.getElementsByClassName("coin").length;i++){
				var selectedBlock = document.getElementsByClassName("coin")[i];
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
			}
			
			for(var i=0;i<document.getElementsByClassName("coin2").length;i++){
				var selectedBlock = document.getElementsByClassName("coin2")[i];
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
		if(level[currentBlock] == 1 && positionY >= topAmt-50 && positionY <= topAmt-40 && gravity >= 0 || level2[currentBlock] == 1 && positionY >= topAmt-100 && positionY <= topAmt-90 && gravity >= 0 || level3[currentBlock] == 1 && positionY >= topAmt-150 && positionY <= topAmt-140 && gravity >= 0){
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
		
		//coins
		if(coinlevel[currentBlock] == 1){
			if(coinBlock != currentBlock){
				coinsOnLevel++;
				coinBlock = currentBlock;
				
				if(positionY >= topAmt-235 && positionY <= topAmt-125){
					
					var coinSound = new Audio('ding.wav');
					coinSound.play();
					console.log("ye: " + positionY);
					coins++;
					document.getElementsByClassName("coin")[coinsOnLevel-1].style.top="5555px";
					
				} else {
					console.log("na: " + positionY);
				}
			}
		}
		
		//coins 2
		if(coinlevel2[currentBlock] == 1){
			
			if(coinBlock2 != currentBlock){
				
				coinsOnLevel2++;
				coinBlock2 = currentBlock;
				
				if(positionY >= topAmt-155 && positionY <= topAmt-45){
					
					var coinSound = new Audio('ding.wav');
					coinSound.play();
					console.log("ye: " + positionY);
					coins++;
					document.getElementsByClassName("coin2")[coinsOnLevel2-1].style.top="5555px";
					
				} else {
					console.log("na: " + positionY);
				}
			}
		}
		
		if(positionY >= 890 || positionY <= 10){
			Respawn();
		}
		
		if(positionX >= 500 && respawning == false || passes > 0){
			score = currentBlock-leftAmt/75;
			score = parseInt(score/7);
			score = passes * 5 + score;
			if(score > 0){
				document.getElementById("score").style.opacity = 0.5;
			}
		document.getElementById("score").innerHTML = score;
		}
		
		if(score > highscore){
			highscore = score;
			document.getElementById("highscore").innerHTML = highscore;
		}
		
		if(score < 5){
			levelColour = "white";
			document.getElementById("background").style.backgroundColor="black";
		} else if(score >= 5 && score < 10){
			levelColour = "#02e633";
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
		
		document.getElementById("coins").innerHTML = coins;
		document.getElementById("shopCoinsText").innerHTML = coins;
		if(redplayerPurchased == true){
			document.getElementById("player").style.backgroundColor="red";
			document.getElementById("shop2").innerHTML="red player<br>purchased";
		}
		if(minionPurchased == true){
			document.getElementById("background").style.backgroundImage="url('dancingminion.gif')";
			document.getElementById("shop1").innerHTML="minion background<br>purchased";
		}
		
	} else {
		document.title = "New Tab";
		document.getElementById("coins").innerHTML = coins;
		document.getElementById("shopCoinsText").innerHTML = coins;
		if(redplayerPurchased == true){
			document.getElementById("player").style.backgroundColor="red";
			document.getElementById("shop2").innerHTML="red player<br>purchased";
		}
		if(minionPurchased == true){
			document.getElementById("background").style.backgroundImage="url('dancingminion.gif')";
			document.getElementById("shop1").innerHTML="minion background<br>purchased";
		}
	}
}, 5);

function GenerateMore(){
		positionX = 0;
		coinsOnLevel = 0;
		coinsOnLevel2 = 0;
		level =	[];
		level2 = [];
		level3 = [];
		portal = [];
		coinlevel = [];
		coinlevel2 = [];
		document.getElementById("blocks").innerHTML="";
		passes++;
		renderLevel();
		var portalSound = new Audio('ding.wav');
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
	
	for(var i=0;i<document.getElementsByClassName("block").length;i++){
		var selectedBlock = document.getElementsByClassName("block")[i];
		if(selectedBlock.style.opacity > 0){
			selectedBlock.style.opacity=parseFloat(selectedBlock.style.opacity) - 0.05/5;
		}
	}
	for(var i=0;i<document.getElementsByClassName("coin").length;i++){
		var selectedBlock = document.getElementsByClassName("coin")[i];
		if(selectedBlock.style.opacity > 0){
			selectedBlock.style.opacity=parseFloat(selectedBlock.style.opacity) - 0.05/5;
		}
	}
	for(var i=0;i<document.getElementsByClassName("coin2").length;i++){
		var selectedBlock = document.getElementsByClassName("coin2")[i];
		if(selectedBlock.style.opacity > 0){
			selectedBlock.style.opacity=parseFloat(selectedBlock.style.opacity) - 0.05/5;
		}
	}
	setTimeout(function (){
	
		document.getElementById("player").style.opacity=0;
		if(document.getElementById("player").style.opacity < 1){
			document.getElementById("player").style.opacity=parseFloat(document.getElementById("player").style.opacity) + 0.05/5;
		}
		positionY = topAmt-200;
		jumps = 2;
		passes = 0;
		positionX = 0;
		gravity = 0;
		score = 0;
		coinsOnLevel = 0;
		coinsOnLevel2 = 0;
		level =	[];
		level2 = [];
		level3 = [];
		portal = [];
		coinlevel = [];
		coinlevel2 = [];
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
		document.getElementById("game1").style.opacity=0.8;
		document.getElementById("game2").style.right="55vw";
		document.getElementById("game2").style.opacity=0.8;
		document.getElementById("closeGames").style.opacity = 0.8;
		document.getElementById("closeGames").style.pointerEvents = "auto";
		opened = true;
	} else {
		document.getElementById("game1").style.left="-200px";
		document.getElementById("game1").style.opacity=0;
		document.getElementById("game2").style.right="-200px";
		document.getElementById("game2").style.opacity=0
		document.getElementById("closeGames").style.opacity = 0;
		document.getElementById("closeGames").style.transitionDelay = "0s";
		document.getElementById("closeGames").style.pointerEvents = "none";
		opened = false;

	}
}

function OpenShop(){
	if(shopOpened == false){
		shopOpened = true;
		document.getElementById("shop1").style.opacity=0.8;
		document.getElementById("shop2").style.opacity=0.8;
		document.getElementById("shopCoins").style.opacity=0.8;
		document.getElementById("shopClose").style.opacity = 0.8;
		document.getElementById("shop1").style.pointerEvents = "auto";
		document.getElementById("shop2").style.pointerEvents = "auto";
		document.getElementById("shopClose").style.pointerEvents = "auto";
	} else {
		shopOpened = false;
		document.getElementById("shop1").style.opacity=0;
		document.getElementById("shop2").style.opacity=0;
		document.getElementById("shopCoins").style.opacity=0;
		document.getElementById("shopClose").style.opacity = 0;
		document.getElementById("shop1").style.pointerEvents = "none";
		document.getElementById("shop2").style.pointerEvents = "none";
		document.getElementById("shopClose").style.pointerEvents = "none";
	}	
}

var redplayerPurchased = false;
var minionPurchased = false;
function Buy(item){
	switch (item){
		case "minion":
			if(minionPurchased == false){
				if(coins >= 100){
					coins -= 100;
					minionPurchased = true;
					var canBuy = new Audio('jump.wav');
					canBuy.play();
				} else {
					var cantBuy = new Audio('cantJump.wav');
					cantBuy.play();
				}
			} else {
				var cantBuy = new Audio('cantJump.wav');
				cantBuy.play();
			}
		break;
		case "redplayer":
			if(redplayerPurchased == false){
				if(coins >= 25){
				coins -= 25;
				redplayerPurchased = true;
				var canBuy = new Audio('jump.wav');
				canBuy.play();
				} else {
					var cantBuy = new Audio('cantJump.wav');
					cantBuy.play();
				}
			} else {
				var cantBuy = new Audio('cantJump.wav');
				cantBuy.play();
			}
		break;
	}
}

function Save(){
	var save = {
		'highscore': highscore,
		'coins': coins,
		'redplayerPurchased': redplayerPurchased,
		'minionPurchased': minionPurchased
	}
	localStorage.setItem("save",JSON.stringify(save));
}

function DeleteSave(){
	if (confirm('are you sure you want to delete all progress')) {
		deleted = true;
		localStorage.removeItem("save");
		setTimeout(function (){
			location.reload();
		}, 50);
	}
}
	
function Load(){
	if(localStorage.getItem("save") !== null){
		var savegame = JSON.parse(localStorage.getItem("save"));
		if (typeof savegame.highscore !== "undefined") highscore = savegame.highscore;
		if (typeof savegame.coins !== "undefined") coins = savegame.coins;
		if (typeof savegame.redplayerPurchased !== "undefined") redplayerPurchased = savegame.redplayerPurchased;
		if (typeof savegame.minionPurchased !== "undefined") minionPurchased = savegame.minionPurchased;
	}
	document.getElementById("highscore").innerHTML = highscore;
}

function Pause(){
	if(paused == false){
		paused = true;
		document.getElementById("overlay").style.opacity=0.8;
		document.getElementById("overlay").style.zIndex=9999;
		document.getElementById("touchOverlay").style.cursor="auto";
	} else {
		paused = false;
		document.getElementById("overlay").style.opacity=0;
		document.getElementById("overlay").style.zIndex=9999999;
		document.getElementById("touchOverlay").style.cursor="pointer";
	}
}

window.onbeforeunload = function(){
	if(!deleted){
		Save();
	}
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
			if(shopOpened == true){
				shopOpened = false;
				document.getElementById("shop1").style.opacity=0;
				document.getElementById("shop2").style.opacity=0;
				document.getElementById("shopCoins").style.opacity=0;
				document.getElementById("shop1").style.pointerEvents = "none";
				document.getElementById("shop2").style.pointerEvents = "none";
			}	
		}
    }
}