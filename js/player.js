import { InputHandler } from "./input.js";

export class Player{
    constructor(ctx, startPosX, startPosY, width, height, upKey, downKey, anim_stepbackD){
        this.score = 0;

        // keys for movement
        this.down = downKey;
        this.up = upKey;

        // position
        this.x = startPosX;
        this.y = startPosY;

        // speed
        this.speed = 0;
        this.max_speed = 8;
        this.speed_increment = 1;
        

        // padle conf
        this.width = width;
        this.height = height;
        this.color = 'rgba(255,255,255)';

        // when ball hits anim conf
        this.anim_increment = 0;
        this.anim_max_stepback = 3;
        this.anim_stepback = 0;
        this.anim_stepbackD = anim_stepbackD;



        // canvas contenxt and keypress listener
        this.ctx = ctx;
        this.keyInput = new InputHandler([this.down, this.up]);
        
    }

    input(){
        if(this.keyInput.pressedKeys.indexOf(this.down) !== -1){ // if down is pressed
            if(this.speed < this.max_speed){
                this.speed += this.speed_increment;
            }
        }

        if(this.keyInput.pressedKeys.indexOf(this.up) !== -1){ // if up is pressed
            if(this.speed > -this.max_speed){
                this.speed -= this.speed_increment;
            }
        }

        // if none of the both keys are pressed, then we need to stop the padle
        if(this.keyInput.pressedKeys.indexOf(this.down) === -1 && this.keyInput.pressedKeys.indexOf(this.up) === -1){
            this.speed = 0;
        }
    }

    

    move(){
        // check players input
        this.input();

        //////// animation start
        // anim_inc is set to 0, so when needed that will be changed
        
        
        if(this.anim_stepback >= this.anim_max_stepback){ // reached its max limit, increment needs to be reversed
            this.anim_increment = -this.anim_increment;
            this.anim_stepback += this.anim_increment;
        }else{ // havent reached limit yet
            this.anim_stepback += this.anim_increment;
        }

        if(this.anim_stepback === 0){
            this.anim_increment = 0;
        }
        //////// animation end
        
        this.y += this.speed;
    }

    draw(){
        this.ctx.fillStyle = this.color;
        this.ctx.fillRect(this.x + (this.anim_stepback * this.anim_stepbackD), this.y, this.width, this.height);
    }

    // function returns direction where current player is moving
    dir(){
        if(this.speed < 0) return -1; // going up
        if(this.speed > 0) return 1; // going down
        if(this.speed === 0) return 0; // standing
    }
}

