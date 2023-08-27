(function () {
  "use strict";
  const canvas = document.querySelector("#canvas-board");
  const colorpicker = document.querySelector("#colorpicker");
  const draw = document.querySelector(".draw");
  const size = draw.querySelector('input');
  const eraser = document.querySelector(".eraser");
  const reset = document.querySelector(".reset");
  const download = document.querySelector(".download");
  const tools = document.querySelector(".tools");

  const ctx = canvas.getContext("2d");
  var lineWidth = 4;

  canvas.width = parseInt((document.documentElement.clientWidth / 100) * 80);
  canvas.height = parseInt((document.documentElement.clientHeight / 100) * 70);

  ctx.lineJoin = "round";
  ctx.lineCap = "round";
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = "#000";

  let drag = false;

  function drawPaint(e) {
    if (!drag) {
      return;
    }

    var rect = canvas.getBoundingClientRect();

    var x = e.clientX - rect.left - 20;
    var y = e.clientY - rect.top - 20;

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function cbfMouseDown(e) {
    drag = true;

    var rect = canvas.getBoundingClientRect();

    var x = e.clientX - rect.left - 20;
    var y = e.clientY - rect.top - 20;

    ctx.beginPath();
    ctx.moveTo(x, y);
  }
  function cbfMouseup() {
    drag = false;
  }
  canvas.addEventListener("mousedown", cbfMouseDown);
  canvas.addEventListener("mousemove", drawPaint);
  canvas.addEventListener("mouseup", cbfMouseup);
  canvas.addEventListener("mouseout", cbfMouseup);

  //For touch screen device
  canvas.addEventListener("touchstart", function (e) {
    var touch = e.touches[0] || e.changedTouches[0];
    cbfMouseDown(touch);
  });

  canvas.addEventListener("touchmove", function (e) {
    var touch = e.touches[0] || e.changedTouches[0];
    drawPaint(touch);
  });
  canvas.addEventListener("touchend", cbfMouseup);

  colorpicker.addEventListener("change", function () {
    ctx.strokeStyle = this.value;
    ctx.lineWidth = lineWidth;
    ctx.globalCompositeOperation = "source-over";
  });

  window.addEventListener("resize", function () {
    canvas.width = parseInt((document.documentElement.clientWidth / 100) * 80);
    canvas.height = parseInt(
      (document.documentElement.clientHeight / 100) * 70
    );
  });

  download.addEventListener("click", function (e) {
    var name = prompt(
      "Please enter image name with extention.[Like:- png, jpg, jpeg]",
      "canvas.png"
    );
    if (!name) {
      return;
    }
    var a = document.createElement("a");
    a.href = canvas.toDataURL();
    a.download = name ? name : "canvas.jpg";
    document.body.appendChild(a).click();
    document.body.removeChild(a);
  });

  draw.addEventListener("click", function (e) {
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = colorpicker.value ? colorpicker.value : "#000";
    ctx.globalCompositeOperation = "source-over";
	if ( e.target != size ) {
		draw.classList.toggle("open");
	}
  });

  size.addEventListener("change", function (e) {
	lineWidth = this.value;
	draw.querySelector('.size-text').innerHTML = this.value;
  });

  eraser.addEventListener("click", function (e) {
    // ctx.strokeStyle = 'rgba(0,0,0,0)';
    ctx.lineWidth = lineWidth;
    ctx.globalCompositeOperation = "destination-out";
  });

  reset.addEventListener("click", function (e) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = lineWidth;
  });

  tools.addEventListener("click", function (e) {
    const btnArea = document.querySelector(".buttons-area");
    btnArea.classList.toggle("active");
  });
})();
