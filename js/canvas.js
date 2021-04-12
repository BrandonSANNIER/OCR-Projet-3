class Canvas {
	constructor(canvasID, btnClear) {
		this.canvas = $(canvasID);
		this.btnClear = $(btnClear);
		this.ctx = this.canvas[0].getContext("2d");
		this.ctx.strokeStyle = 'black';
		this.ctx.lineWidth = 1;
		this.ctx.lineJoin = 'round';
		this.ctx.lineCap = 'round';
		this.draw = null;
		this.start = false;
		this.initSettings();
	}

	initSettings() {
		// MOUSE (laptop)
		this.canvas.mousedown((e) => {
			this.draw = true;
			this.x = e.pageX - this.canvas.offset().left;
			this.y = e.pageY - this.canvas.offset().top;
		});

		this.canvas.mouseup((e) => {
			this.draw = false;
			this.start = false;
		});

		this.canvas.mouseleave((e) => {
			this.draw = false;
			this.start = false;
		});

		this.canvas.mousemove((e) => {
			if (this.draw) {
				this.x = e.pageX - this.canvas.offset().left;
				this.y = e.pageY - this.canvas.offset().top;
				this.canvasResult();
				console.log(this.x, this.y)
			}
		});
		//TOUCH (mobile)

		this.canvas.on('touchstart', (e) => {
			e.preventDefault();
			this.draw = true;
			this.x = e.touches[0].clientX - this.canvas.offset().left;
			this.y = e.touches[0].clientY - this.canvas.offset().top;
		});

		this.canvas.on('touchend', (e) => {
			e.preventDefault();
			this.draw = false;
			this.start = false;
			this.signature;
		});

		this.canvas.on('touchleave', (e) => {
			e.preventDefault();
			this.draw = false;
			this.start = false;
		});

		this.canvas.on('touchmove', (e) => {
			e.preventDefault();
			if (this.draw) {
				this.x = e.originalEvent.targetTouches[0].pageX - this.canvas.offset().left;
				this.y = e.originalEvent.targetTouches[0].pageY - this.canvas.offset().top;
				this.canvasResult();
				console.log(this.x, this.y)
			}
		});

		//Clear Canvas
		this.btnClear.on("click", (e) => {
			this.clearCanvas();
		});
		//Resizing
		$(window).on('resize', (e) => {
			this.resize();
		});
	};

	canvasResult() {
		if (!this.start) {
			this.ctx.beginPath();
			this.ctx.moveTo(this.x, this.y);
			this.start = true;
		} else {
			this.ctx.lineTo(this.x, this.y);
			this.ctx.stroke();
		}
	};

	clearCanvas() {
		this.ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.ctx.clearRect(0, 0, canvas.width, canvas.height);
	};
}