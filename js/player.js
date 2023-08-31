export class Player{
    constructor(ctx, startPosX, startPosY){
        this.score = 0;

        this.x = startPosX;
        this.y = startPosY;

        // speed
        this.speed = 0;
        this.max_speed = 6;

        this.width = 20;
        this.height = 80;

        this.color = 'rgba(230,230,230)';
        this.ctx = ctx;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

