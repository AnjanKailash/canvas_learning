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

var mouse = {
    x: undefined,
    y: undefined
}
var maxRadius = 100;
var minRadius = 2;

window.addEventListener('mousemove', 
    function(event) {
       //get the mouse position
        mouse.x = event.x;
        mouse.y = event.y;
        this.console.log(mouse);
    }
);

window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

//Arc/ circle
function Circle(x, y, dx, dy, radius, r, g, b) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.initialRadius = radius;
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

        //interactivity
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            && this.radius < maxRadius
            ) {
            this.radius += 1;
        } else if (this.radius > this.initialRadius && this.radius > minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];

function init() {

    circleArray = [];

    for (var i = 0; i < 500; i++) {
        var radius = Math.random() * 30;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - .5) * 4;
        var dy = (Math.random() - .5) * 4;
        var r = Math.random()*255;
        var g = Math.random()*255;
        var b = Math.random()*255;
        circleArray.push(new Circle(x, y, dx, dy, radius, r, g, b));
    }
}
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    circleArray.forEach(circle => {
        circle.update();
    });
}

init();
animate();
