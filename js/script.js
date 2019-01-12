var canvas;
var ctx;
var canvas_width;
var canvas_height;

function drawCircle(){
	var rotate_num = 1;
	var parentR = 130;
	var childR = 70;
	var centerOrbitR = parentR - childR;
	var parentImg = new Image;
	var childImg = new Image;
	parentImg.src = "img/large_circle.svg"
	childImg.src = "img/small_circle1.svg"

	parentImg.onload = function(){
		ctx.translate(canvas_width/4, canvas_height/4);
		path_ctx.translate(canvas_width/4, canvas_height/4);

		setInterval(function(){
			ctx.clearRect(-parentR, -parentR, parentR*2, parentR*2)
			ctx.drawImage(parentImg, -parentR, -parentR,parentR*2,parentR*2);
			ctx.translate(0, -centerOrbitR);
			path_ctx.translate(0, -centerOrbitR);

			var angle = rotate_num*Math.PI/180;
			var x = centerOrbitR*Math.sin(angle);
			var y = centerOrbitR - centerOrbitR*Math.cos(angle);
			var arc = angle*parentR;
			var angle_self = arc/childR;
			var angle_rotate = angle + angle_self;

			ctx.translate(x, y);
			path_ctx.translate(x, y);

			ctx.rotate(Math.PI*2 - angle_rotate);
			path_ctx.rotate(Math.PI*2 - angle_rotate);

			path_ctx.fillRect(0,-(childR-10),2,2);
			ctx.drawImage(childImg, -childR, -childR,childR*2,childR*2);

			ctx.rotate(-(Math.PI*2 - angle_rotate));
			path_ctx.rotate(-(Math.PI*2 - angle_rotate));

			ctx.translate(-x, -y+centerOrbitR);
			path_ctx.translate(-x, -y+centerOrbitR);

			rotate_num = rotate_num+0.5;
		}, 5);
	}
}

function setCanvas(){
	canvas = document.getElementById("main_canvas");
	canvas_width = canvas.width;
	canvas_height = canvas.height;
	ctx = canvas.getContext("2d");
	ctx.scale(2, 2);

	path_canvas = document.getElementById("path_canvas");
	path_ctx = path_canvas.getContext("2d");
	path_ctx.scale(2, 2);
}


function setFullScreen(){
	var w = $("body").width();
	var h = $("body").height();
	$("#main_canvas").attr("width",w);
	$("#main_canvas").attr("height",h);
	$("#path_canvas").attr("width",w);
	$("#path_canvas").attr("height",h);
}

window.onload = function(){
	setFullScreen();
	setCanvas();
	drawCircle();
}