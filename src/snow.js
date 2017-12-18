import _ from 'lodash'

var Snow = function(canvas) {
        
    var ctx = canvas.getContext('2d');
    var windowW = window.innerWidth;
    var windowH = window.innerHeight;
    var numFlakes = 150;
    var flakes = [];
    var mouseX = -100;
    var mouseY = -100;
    var mouseMag = 2.0
    // -------------------------------------
    function Flake(x, y) {

        var maxWeight = 2;
        var maxSpeed = 3;

        this.x = x;
        this.y = y;
        this.r = _.random(0, 1);
        this.a = _.random(0, Math.PI);
        this.aStep = 0.01;

        this.weight = _.random(1, maxWeight);
        this.alpha = (this.weight / maxWeight);
        this.speed = (this.weight / maxWeight) * maxSpeed;

        this.update = function() {
            this.x += Math.cos(this.a) * this.r;
            this.a += this.aStep;
            this.y += this.speed;
        }
    }

    function mouseMove(e) {
        mouseX = e.pageX
        mouseY = e.pageY
    } 

    // -------------------------------------
    function init() {
        var flake, x, y;
      
        for (var i = 0; i < numFlakes; i++) {
            x = _.random(0, windowW);
            y = _.random(0, windowH);
            flake = new Flake(x, y);
            flakes.push(flake);
        }

        document.removeEventListener('mousemove', mouseMove, false);
        document.addEventListener('mousemove', mouseMove, false);

        scaleCanvas();
        loop();  
    }

    function scaleCanvas() {
      canvas.width = windowW;
      canvas.height = windowH;
    }

    function loop() {
        
        windowW = window.innerWidth;
        windowH = window.innerHeight;

        // clear canvas
        ctx.save();
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, windowW, windowH);
        ctx.restore();

        for (var i = 0; i < flakes.length; i++) {
          
            var flake = flakes[i];
            flake.update();

            var dx = mouseX - flake.x
            var dy = mouseY - flake.y
            var d = Math.sqrt(dx * dx + dy * dy)

            if (d < 200) {
                dx /= d;
                dy /= d;
                dx *= mouseMag;
                dy *= mouseMag;
                flake.x -= dx;
                flake.y -= dy;
            }
            ctx.beginPath();
            ctx.arc(flake.x, flake.y, flake.weight, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + flake.alpha + ')';
            ctx.strokeStyle = 'rgba(100, 100, 100, ' + flake.alpha + ')';
            ctx.fill();
            ctx.stroke();

            if (flake.y >= windowH) {
                flake.y = -flake.weight;
            }  
        }
        requestAnimationFrame(loop);
    }

    return {
        init: init
    }
}
export default Snow;
