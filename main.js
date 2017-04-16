var gravity = 0;
var positionY = 300;
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
var started = false;
var respawning = false;

renderLevel();
function renderLevel(){
	for(var i=0;i<200;i++){
		level3.push(Math.floor(Math.random() * 10));
		level2.push(Math.floor(Math.random() * 5));
		level.push(Math.floor(Math.random() * 3));
	}
	var y = document.createElement("div");
	y.style.left=900 + "px";
	y.style.top=600 + "px";
	y.style.width=500 + "px";
	y.style.borderColor="white";
	y.style.opacity=0;
	y.className="block";
	y.id="startBlock";
	var blocks = document.getElementById("blocks");
	blocks.appendChild(y);
	
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
}

function Jump(){
	started = true;
	if(jumps >= 1){
		gravity = -1;
		jumpPosition = positionY - 140;
		jumping = true;
		grounded = false;
		jumps--;
	}
}

window.setInterval(function(){
	
	//fade in start
	if(document.getElementById("startBlock") != null){
		document.getElementById("startBlock").style.opacity = parseFloat(document.getElementById("startBlock").style.opacity) + 0.05/5;
	}
	if(document.getElementById("player").style.opacity < 1){
		document.getElementById("player").style.opacity = parseFloat(document.getElementById("player").style.opacity) + 0.05/5;
	}
	document.getElementById("tutorial").style.opacity = 0.5;
	
	if(started == true){
        positionX += 1.5;
		document.getElementById("tutorial").style.opacity = 0;
			
		for(var i=0;i<document.getElementsByClassName("block").length;i++){
			var selectedBlock = document.getElementsByClassName("block")[i];
			selectedBlock.style.borderColor=levelColour;
			var leftFloat = parseFloat(selectedBlock.style.left, 10);
			selectedBlock.style.left=leftFloat - 1.5 + "px";
			
			if(respawning == false){
				if (leftFloat <= 920 && leftFloat >= 880){	
					selectedBlock.style.opacity = parseFloat(selectedBlock.style.opacity) + 0.1/5;
				} else if (leftFloat < 880){
					selectedBlock.style.opacity = parseFloat(selectedBlock.style.opacity) - 0.01/5;
				} else if (leftFloat > 920 && leftFloat < 1800){
					selectedBlock.style.opacity = parseFloat(selectedBlock.style.opacity) + 0.003/5;
				}
			}
			
			if(leftFloat < -880){
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
	
	var currentBlock = parseInt(positionX/75+12);
	
	if(level[currentBlock] == 1 && positionY >= 700 && positionY <= 710 && gravity >= 0 || level2[currentBlock] == 1 && positionY >= 650 && positionY <= 660 && gravity >= 0 || level3[currentBlock] == 1 && positionY >= 600 && positionY <= 610 && gravity >= 0 || positionX <= 500 && positionY >= 550 && positionY <= 560 && gravity >= 0){
		grounded = true;
		gravity = 0;
	} else {
		grounded = false;
	}
	
	if(grounded == false){
		gravity += 0.03;
		positionY = positionY + gravity;
		positionY = Math.round(positionY * 100) / 100;
		document.getElementById("player").style.top=positionY + "px";
	} else {
		jumps = 2;
	}
	
	if(positionY >= 890 || positionY <= 10){
		Respawn();
	}
	
	if(currentBlock >= 18){
		score = currentBlock-18;
		score = parseInt(score/5);
		document.getElementById("score").style.opacity = 0.5;
	} else {
		score = 0;
	}	
	
	if(score > highscore){
		highscore = score;
	}
	
	if(score < 5){
		levelColour = "white";
	} else if(score > 5 && score < 10){
		levelColour = "green";
	} else if(score > 10 && score < 15){
		levelColour = "blue";
	} else if(score > 20 && score < 25){
		levelColour = "yellow";
	} else if(score > 30 && score < 35){
		levelColour = "fuchsia";
	} else if(score > 35 && score < 40){
		levelColour = "red";
	}
	
	document.getElementById("score").innerHTML = score;
	document.getElementById("highscore").innerHTML = highscore;
}, 5);

function Respawn(){
	respawning = true;
	document.getElementById("player").style.opacity=0;
	for(var i=0;i<document.getElementsByClassName("block").length;i++){
		var selectedBlock = document.getElementsByClassName("block")[i];
		if(selectedBlock.style.opacity > 0){
			selectedBlock.style.opacity=parseFloat(selectedBlock.style.opacity) - 0.05/5;
		}
	}
	setTimeout(function (){
		positionY = 500;
		positionX = 0;
		gravity = 0;
		score = 0;
		level =	[];
		level2 = [];
		level3 = [];
		document.getElementById("blocks").innerHTML="";
		levelColour = "white";
		renderLevel();
		respawning = false;
	}, 750);
}

document.body.onkeydown = function(e){
	//space
    if(e.keyCode == 32){
		Jump();
    }
}

var url = window.location.pathname;
var page = url.substring(url.lastIndexOf('/') + 1);
function CheckMobile(){
	var ratio = window.innerWidth / window.innerHeight;
	if(ratio < 1.92 && page == "index.html"){
		window.location.href = "mobile.html";
	} else if (ratio >= 1.92 && page == "mobile.html"){
		window.location.href = "index.html";
	}
}

window.addEventListener('resize', function(){
	CheckMobile();
});

CheckMobile();