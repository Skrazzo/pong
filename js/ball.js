export class Ball {
    constructor(ctx){
        // ball speed and direction
        this.speed = 4; // in pixels
        this.xd = 1;
        this.yd = 1;

        this.radius = 10;
        
        // put ball in the center of the canvas
        this.x = ctx.canvas.width / 2;
        this.y = ctx.canvas.height / 2;


        this.color = 'rgb(200,200,200)';

        // canvas api
        this.ctx = ctx;
    }

    // this most likekly will need to move to the main.js
    move(){
        // if right wall has been reached
        if(this.x + this.radius >= this.ctx.canvas.width){
            this.xd = -1;
        }

        // if left wall has been reached
        if(this.x - this.radius <= 0){
            this.xd = 1;
        }

        // if bottom has been reached
        if(this.y + this.radius >= this.ctx.canvas.height){
            this.yd = -1;
        }

        // if top has been reached
        if(this.y - this.radius <= 0){
            this.yd = 1;
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