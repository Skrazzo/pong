import { Ball } from "./js/ball.js";
import { calc_ball_coll_part } from "./js/functions.js";
import { InputHandler } from "./js/input.js";
import { Player } from "./js/player.js";


class GameClass{
    
    

    
    constructor(){
        this.pause = false;
        this.frameRate = 60;
        this.lastFrameTime = Date.now();

        // canvas size
        this.width = 700;
        this.height = 500;

        // getting canvas ready
        const canvas = document.getElementById('canvas');
        canvas.width = this.width;
        canvas.height = this.height;

        this.ctx = canvas.getContext("2d");
        
    }

    start(){
        this.ctx.fillStyle = "gray";
        this.lastFrameTime = Date.now();

        // adding players and ball to the game
        this.ball = new Ball(this.ctx);

        // specifiying player size, and adding them to the game
        this.playerSize = [20, 100];

        this.player1 = new Player(this.ctx, 10, 100, this.playerSize[0], this.playerSize[1], 'w', 's', -1);
        this.player2 = new Player(this.ctx, this.ctx.canvas.width - this.playerSize[0] - 10, 20, this.playerSize[0], this.playerSize[1], 'ArrowUp', 'ArrowDown', 1);

    }

    // update every element positions and states
    update(){
        // check if ball hits the walls
        // if right wall has been reached
        if(this.ball.x + this.ball.radius >= this.ctx.canvas.width){
            this.ball.xd *= -1;
            this.pause = true;         
        }

        // if left wall has been reached
        if(this.ball.x - this.ball.radius <= 0){
            this.ball.xd *= -1;
            this.pause = true;
        }

        // if bottom has been reached
        if(this.ball.y + this.ball.radius >= this.ctx.canvas.height){
            this.ball.yd *= -1;
            this.ball.xd = (this.ball.xd > 0) ? this.ball.xd - (this.ball.xd_increment / 4) : this.ball.xd + (this.ball.xd_increment / 4);
        }

        // if top has been reached
        if(this.ball.y - this.ball.radius <= 0){
            this.ball.yd *= -1;
            this.ball.xd = (this.ball.xd > 0) ? this.ball.xd - (this.ball.xd_increment / 4) : this.ball.xd + (this.ball.xd_increment / 4);
        }


        // check players and balls collision
        // player 1
        if(this.ball.x - this.ball.radius <= this.player1.x + this.player1.width){
            if(this.ball.y >= this.player1.y && this.ball.y <= this.player1.y + this.player1.height){
                this.ball.xd *= -1;
                
                this.ball_player_collision(this.player1, 1);
                this.player1.anim_increment = 0.5; // start the animation
                
            }
        }

        // player2
        if(this.ball.x + this.ball.radius >= this.player2.x){
            if(this.ball.y >= this.player2.y && this.ball.y <= this.player2.y + this.player2.height){
                this.ball.xd *= -1;
                this.ball_player_collision(this.player2, 2);
                this.player2.anim_increment = 0.5; // start the animation
            }
        }


        this.ball.move();
        console.log('xd', this.ball.xd);
        console.log('yd', this.ball.yd);
        this.player1.move();
        this.player2.move();
    }
    
    ball_player_collision(player, ball_direction_after_hit){
        // ball_direction_after_hit will determine to what side ball is moving
        // 1 is right
        // 2 is left
        const dir = ball_direction_after_hit;
        if(dir !== 1 && dir !== 2){
            return;
        }

        switch(calc_ball_coll_part(this.playerSize[1], player.y, this.ball.y)){
            case 1:
                // if paddle was going down, then increase yd by one, unless its already 2 or higher
                if(player.dir() === 1) this.ball.yd += this.ball.yd_increment;
                if(player.dir() === -1) this.ball.yd -= this.ball.yd_increment;
                if(player.dir() === 0) this.ball.yd = (this.ball.yd > 0) ? this.ball.yd - (this.ball.yd_increment / 2) : this.ball.yd + (this.ball.yd_increment / 2);
                
                break;
            case 2:
                this.ball.xd += (dir === 1) ? this.ball.xd_increment : -this.ball.xd_increment;
                
                if(player.dir() === 1) this.ball.yd += this.ball.yd_increment;
                if(player.dir() === -1) this.ball.yd -= this.ball.yd_increment;
                if(player.dir() === 0) this.ball.yd = (this.ball.yd > 0) ? this.ball.yd - (this.ball.yd_increment / 2) : this.ball.yd + (this.ball.yd_increment / 2);

                break;

            case 3:
                if(player.dir() === 1) this.ball.yd += this.ball.yd_increment;
                if(player.dir() === -1) this.ball.yd -= this.ball.yd_increment;
                if(player.dir() === 0) this.ball.yd = (this.ball.yd > 0) ? this.ball.yd - (this.ball.yd_increment / 2) : this.ball.yd + (this.ball.yd_increment / 2);
                
                break;
        }
    }

    // request every element to draw
    draw(){
        this.ball.draw();
        this.player1.draw();
        this.player2.draw();
    }

    // clear canvas, request update and draw functions
    animate(){

        if(!this.pause){
            /*
                Takes current time, subtracts from the last update
                checks if its time to update the frame and does if needed
                saves last updateed time to the variable, and updates next time when needed
                to get 60 fps, or other set
            */
            const currentTime = Date.now();
            const deltaTime = currentTime - this.lastFrameTime;
            const frameInterval = 1000 / this.frameRate;
        
            
            if (deltaTime >= frameInterval) {
    
                this.clear();
                this.update(); // Update game logic
                this.draw();   // Draw game objects
        
                //lastFrameTime = currentTime - (deltaTime % frameInterval);
                this.lastFrameTime = Date.now();
            }

        }

        


        requestAnimationFrame(() => this.animate());
    }

    // clear canvas
    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    
    }

    info(){
        
    }
}


// execute when page is loaded
window.addEventListener("load", () => {
    console.log("Loadded....");
    
    const game = new GameClass();
    
    game.start();
    game.animate();



    //game.info();

});