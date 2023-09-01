export class Ball {
    constructor(ctx){
        // ball speed and direction
        this.speed = 4; // in pixels
        this.xd = -1;
        this.yd = -1;
        // limitations for x and y directions
        this.xd_limit = 3;
        this.yd_limit = 2.5;
        this.xd_increment = 0.8;
        this.yd_increment = 0.8;

        this.radius = 10;
        
        // put ball in the center of the canvas
        this.x = ctx.canvas.width / 2;
        this.y = ctx.canvas.height / 2;


        this.color = 'rgb(200,200,200)';
        //this.color = 'red';

        // canvas api
        this.ctx = ctx;
    }

    // this most likekly will need to move to the main.js
    move(){
        // limiting xd speed to avoid speed glitches
        // if ball is going to the right 3.3 will be set to 3
        // if ball is going to the left, -3.3 will be set to -3
        if(this.xd > this.xd_limit || this.xd < -this.xd_limit){ 
            this.xd = (this.xd > 0) ? this.xd_limit : -this.xd_limit;
        }

        // limiting yd speed to avoid unwanted speed glitches
        if(this.yd > this.yd_limit || this.yd < -this.yd_limit){ 
            this.yd = (this.yd > 0) ? this.yd_limit : -this.yd_limit;
        }

        // limiting xd minimum speed
        if(this.xd < 1 && this.xd > -1){
            this.xd = (this.xd > 0) ? 1 : -1;
        }
        

        this.x = this.x + (this.speed * this.xd);
        this.y = this.y + (this.speed * this.yd);
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.ctx.fill();
    }
}