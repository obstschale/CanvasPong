// global variables 
var ballX, ballY, ballR = 20;
var canvas;
var ctx;
var dx = 2, dy = 4;
var intervalID;
var maxWidth, maxHeight;
var paddle1Y;
var paddle2Y;
var paddleH = 100;
var paddleW = 15;
var paddlePadding = 20;
var paddle1up = false, paddle1down = false;
var paddle2up = false, paddle2down = false;
var score = [0,0]; //score[0] = player 1 & score[1] = player 2

function pause(sec) {
	sec *= 1000;
	sec += new Date().getTime();
	
	while(new Date < sec) {}
}

function button() {
	but = document.getElementById("but");
	but.setAttribute("onclick", "setUp.end()");
	but.innerHTML = "End";
}

var setUp = {
	end: function() {
		clearInterval(intervalID);
		but = document.getElementById("but");
		but.setAttribute("onclick", "setUp.init()");
		but.innerHTML = "Start";
	},
	
	init: function() {
		var canvas = document.getElementById("canvasPong");
		if (canvas.getContext) {
			ctx = canvas.getContext("2d");
		} else {
			alert("Error: getContext not found");
		}
		
		maxWidth = canvas.width;
		maxHeight = canvas.height;
		
		ballX = 150;
		ballY = 150;
		
		setUp.initPaddle();
		
		button();
		
		intervalID = setInterval(draw.game, 10);
		return intervalID;
	},
	
	initPaddle: function() {
			paddle1Y = maxHeight * (3/5);
			paddle2Y = maxHeight * (2/5);
	},
	
	load: function() {
		var canvas = document.getElementById("canvasPong");
		if (canvas.getContext) {
			ctx = canvas.getContext("2d");
		} else {
			alert("Error: getContext not found");
		}
		
		maxWidth = canvas.width;
		maxHeight = canvas.height;
		
		draw.clear();
		draw.background(maxWidth, maxHeight);
		draw.score(maxWidth, maxHeight);
		
		draw.paddle(paddlePadding, maxHeight * (3/5), paddleW, paddleH);
		draw.paddle(maxWidth - paddleW - paddlePadding, maxHeight * (2/5), paddleW, paddleH);
		
		ctx.fillStyle = "white";
		ctx.font = "Bold 30px Courier";
		ctx.textAlign = "center";
		ctx.fillText("Click 'start' to play Pong", maxWidth/2, maxHeight/2);
	}
};

var draw = {
	background: function(width, height) {
		ctx.fillStyle = "black";
		ctx.beginPath();
		//black background
		ctx.rect(0, 0, width, height);
		ctx.closePath()
		ctx.fill();
		
		ctx.strokeStyle = "white";
		var i = 0;
		ctx.beginPath();
		//dotted line in the middle
		do {			
			ctx.moveTo(width/2, i);
			ctx.lineTo(width/2, i+5);
			ctx.stroke();
			i += 10;
		} while(i-20 != height)
		ctx.closePath();
	},
	
	ball: function(x, y, r) {
		ctx.fillStyle = "white";
		ctx.strokeStyle = "black";
		ctx.beginPath();
		ctx.rect(x, y, ballR, ballR);
		ctx.closePath()
		ctx.fill();
		ctx.stroke();
		
	},
	
	clear: function() {
		ctx.clearRect(0, 0, maxWidth, maxHeight);
	},
	
	game: function() {
		//clear canvas and draw ball
		draw.clear();
		draw.background(maxWidth, maxHeight);
		draw.score(maxWidth, maxHeight);
		draw.ball(ballX, ballY, ballR);
		
		//move the paddles if keys are pressed
		if (paddle1up && (paddle1Y != 0)) {
				paddle1Y -= 5;
		} else if (paddle1down && (paddle1Y != maxHeight - paddleH)) {
				paddle1Y += 5;
		}
		if (paddle2up && (paddle2Y != 0)) {
			 	paddle2Y -= 5;
		} else if (paddle2down && (paddle2Y != maxHeight - paddleH)) {
				paddle2Y += 5;
		}
		
		//draw paddles
		draw.paddle(paddlePadding, paddle1Y, paddleW, paddleH);
		draw.paddle(maxWidth - paddleW - paddlePadding, paddle2Y, paddleW, paddleH); 
		
		//bounce Y: reflect every time
		if (ballY + dy + ballR > maxHeight || ballY + dy - ballR < 0) {
			dy = (-1)*dy;
		}
		
		//bounce X: only if paddle is hit
		//paddle 1
		if (ballX + dx < 0 + paddleW + paddlePadding - 2) {
			if (ballY + ballR >= paddle1Y && ballY - ballR <= paddle1Y + paddleH) {
				dy = 16 * ((ballY-(paddle1Y+paddleH/2))/paddleH);
				dx = (-1)*dx;
			} else {
				score[1]++;
				ballX = maxWidth / 2;
				ballY = maxHeight / 2;
				dx = 2;
				dy = 4;
				pause(1);			
			}
		}
		//paddle 2
		if (ballX + dx > maxWidth - ballR - paddleW - paddlePadding + 2) {
			if (ballY + ballR >= paddle2Y && ballY - ballR <= paddle2Y + paddleH) {
				dy = 16 * ((ballY-(paddle2Y+paddleH/2))/paddleH);
				dx = (-1)*dx;
			} else {
				score[0]++;
				ballX = maxWidth / 2;
				ballY = maxHeight / 2;
				dx = -2;
				dy = 4;
				pause(1);		
			}
		}
				
		ballX += dx;
		ballY += dy;	
	},
	
	paddle: function(x, y, w, h) {
		ctx.fillStyle = "white";
		ctx.beginPath();
		ctx.rect(x, y, w, h);
		ctx.closePath();
		ctx.fill();
	},
	
	score: function(width, height) {
		ctx.fillStyle = "white";
		ctx.font = "Bold 100px Courier";
		ctx.textAlign = "center";
		ctx.fillText(score[0], width*(1/4), 100);
		ctx.fillText(score[1], width*(3/4), 100);
	},
};

//Keydown Events
document.onkeydown = function(evt) {
	if (evt.keyCode === 87)
		paddle1up = true;
	else if (evt.keyCode === 83)
		paddle1down = true;
	
	if (evt.keyCode === 38)
		paddle2up = true;
	else if (evt.keyCode === 40)
		paddle2down = true;
}

document.onkeyup = function(evt) {
	if (evt.keyCode === 87)
		paddle1up = false;
	else if (evt.keyCode === 83)
		paddle1down = false;
	
	if (evt.keyCode === 38)
		paddle2up = false;
	else if (evt.keyCode === 40)
		paddle2down = false;
}

setUp.load();