var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

// c.fillStyle = 'rgba(255, 0, 0, .5)';
// c.fillRect(100, 100, 100, 100);
// c.fillStyle = 'rgba(0, 255, 0, .5)';
// c.fillRect(400, 100, 100, 100);
// c.fillStyle = 'rgba(0, 0, 255, .5)';
// c.fillRect(300, 300, 100, 100);

//line
// c.beginPath();
// c.moveTo(50, 300);
// c.lineTo(300, 100);
// c.lineTo(400, 300);
// c.strokeStyle = '#fa34a3';
// c.stroke();

//Arc/ circle

function Circle(x, y, dx, dy, radius, r, g, b) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.r = r;
    this.g = g;
    this.b = b;

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = 'rgb('+this.r+', '+this.g+', '+this.b+')';
        c.fill();
    }

    this.update = function() {
        if ((this.x + this.radius >= innerWidth) || (this.x - this.radius <= 0)) this.dx = -this.dx;

        if (this.y + this.radius >= innerHeight || this.y - this.radius <= 0) this.dy = -this.dy;

        this.x += this.dx;
        this.y += this.dy

        this.draw();
    }
}

var circleArray = [];

for (var i = 0; i < 100; i++) {
    var radius = Math.random() * 30;
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - .5) * 8;
    var dy = (Math.random() - .5) * 8;
    var r = Math.random()*255;
    var g = Math.random()*255;
    var b = Math.random()*255;
    circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach(circle => {
        circle.update();
    });
}


animate();
