import { Ball } from "./js/ball.js";
import { calc_ball_coll_part } from "./js/functions.js";
import { InputHandler } from "./js/input.js";
import { Player } from "./js/player.js";


class GameClass{
    
    constructor(){
        // sounds
        this.sounds = true;
        this.hitAudio = new Audio('./assets/hit.wav');
        this.hitAudio.volume = 1;

        this.pause = false;
        this.userPause = true;
        this.frameRate = 60;
        this.lastFrameTime = Date.now();

        // canvas size
        this.width = 800;
        this.height = 600;
        this.trails = false;

        // getting canvas ready
        const canvas = document.getElementById('canvas');
        canvas.width = this.width;
        canvas.height = this.height;

        this.ctx = canvas.getContext("2d");
        
        // p for pause, and m for sound 
        document.addEventListener('keydown', (e) => {
            if(e.key === 'p'){ 
                this.userPause = !this.userPause;
            }

            if(e.key === 'm'){
                this.sounds = !this.sounds;
            }

            if(e.key === 't'){
                this.trails = !this.trails;
            }
        });
    }

    start(){
        this.ctx.fillStyle = "gray";
        this.lastFrameTime = Date.now();

        // adding players and ball to the game
        this.ball = new Ball(this.ctx);

        // specifiying player size, and adding them to the game
        this.playerSize = [20, 100];

        this.player1 = new Player(this.ctx, 10, (this.ctx.canvas.height / 2) - (this.playerSize[1] / 2), this.playerSize[0], this.playerSize[1], 'w', 's', -1);
        this.player2 = new Player(this.ctx, this.ctx.canvas.width - this.playerSize[0] - 10, (this.ctx.canvas.height / 2) - (this.playerSize[1] / 2), this.playerSize[0], this.playerSize[1], 'ArrowUp', 'ArrowDown', 1);

    }

    draw_score(){
        

        this.ctx.font = "50px pixel";
        this.ctx.fillStyle = "white"; // Fill color

        const score1 = (this.player1.score < 10) ? '0' + this.player1.score : this.player1.score;
        const score2 = (this.player2.score < 10) ? '0' + this.player2.score : this.player2.score;
        const scoreText = score1 + '   ' + score2;
        const textWidth = this.ctx.measureText(scoreText).width;

        // Write text on the canvas
        this.ctx.fillText(scoreText, (this.ctx.canvas.width - textWidth) / 2 , 50); // Fill text
    }

    draw_pause(){
        this.ctx.fillStyle = 'rgb(10,10,10)';
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

        // write paused
        this.ctx.font = "50px pixel";
        this.ctx.fillStyle = "white"; // Fill color
        
        var text = 'PAUSED';
        var textWidth = this.ctx.measureText(text).width;

        this.ctx.fillText(text, (this.ctx.canvas.width - textWidth) / 2 , 100); // Fill text

        // sound
        this.ctx.font = "30px pixel";
        this.ctx.fillStyle = "gray"; // Fill color
        text = 'Sound ' + ((this.sounds) ? 'on' : 'off') + ' (m)';
        textWidth = this.ctx.measureText(text).width;

        this.ctx.fillText(text, (this.ctx.canvas.width - textWidth) / 2 , 170); // Fill text

        // trails
        text = 'Trails ' + ((this.trails) ? 'on' : 'off') + ' (t)';
        textWidth = this.ctx.measureText(text).width;

        this.ctx.fillText(text, (this.ctx.canvas.width - textWidth) / 2 , 210); // Fill text
    }

    draw_lines(){
        this.ctx.fillStyle = "rgb(180,180,180)"; // Fill color
        const width = 10;
        const height = 10;
        const gap = 10;
        const lines = Math.ceil( this.ctx.canvas.height / (gap + height));

        for(var i = 0; i < lines; i++){
            this.ctx.fillRect((this.ctx.canvas.width - width) / 2, (height + gap) * i, width, height);
        }
        
        
    }

    // update every element positions and states
    update(){
        // check if ball hits the walls
        // if right wall has been reached
        if(this.ball.x + this.ball.radius >= this.ctx.canvas.width){
            this.ball.xd *= -1;
            this.player1.add_score();  

            this.restart();
        }

        // if left wall has been reached
        if(this.ball.x - this.ball.radius <= 0){
            this.ball.xd *= -1;
            this.player2.add_score();

            this.restart();
        }

        // if bottom has been reached
        if(this.ball.y + this.ball.radius >= this.ctx.canvas.height){
            this.ball.yd *= -1;
            this.ball.xd = (this.ball.xd > 0) ? this.ball.xd - (this.ball.xd_increment / 4) : this.ball.xd + (this.ball.xd_increment / 4);

            if(this.sounds) this.hitAudio.play();
        }

        // if top has been reached
        if(this.ball.y - this.ball.radius <= 0){
            this.ball.yd *= -1;
            this.ball.xd = (this.ball.xd > 0) ? this.ball.xd - (this.ball.xd_increment / 4) : this.ball.xd + (this.ball.xd_increment / 4);
            
            if(this.sounds) this.hitAudio.play();
        }


        // check players and balls collision
        // player 1
        if(this.ball.x - this.ball.radius <= this.player1.x + this.player1.width){
            if(this.ball.y >= this.player1.y && this.ball.y <= this.player1.y + this.player1.height){
                this.ball.xd *= -1;
                
                this.ball_player_collision(this.player1, 1);
                this.player1.anim_increment = 1; // start the animation
                if(this.sounds) this.hitAudio.play();
                
            }
        }

        // player2
        if(this.ball.x + this.ball.radius >= this.player2.x){
            if(this.ball.y >= this.player2.y && this.ball.y <= this.player2.y + this.player2.height){
                this.ball.xd *= -1;
                this.ball_player_collision(this.player2, 2);
                this.player2.anim_increment = 0.5; // start the animation
                if(this.sounds) this.hitAudio.play();
            }
        }


        this.ball.move();
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
        this.draw_lines();
        this.ball.draw();
        this.player1.draw();
        this.player2.draw();
        this.draw_score();
    }

    // clear canvas, request update and draw functions
    animate(){

        if(!this.pause && !this.userPause){
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

        }else{

            if(this.userPause) this.draw_pause();
        }

        


        requestAnimationFrame(() => this.animate());
    }

    // clear canvas
    clear(fully = false){
        if(this.trails){
            this.ctx.fillStyle = 'rgba(10,10,10,0.6)';
            this.ctx.fillRect(0,0,this.width, this.height);
        }else{
            this.ctx.clearRect(0, 0, this.width, this.height);
        }

        if(fully) this.ctx.clearRect(0, 0, this.width, this.height);
    }

    

    restart(){

        this.pause = true;
        setTimeout(() => {
            this.player1.restart();
            this.player2.restart();
            this.ball.restart();
            this.pause = false;
        }, 750);
    }

}


// execute when page is loaded
window.addEventListener("load", () => {
    console.log("Loadded....");
    
    const game = new GameClass();
    
    game.start();
    game.animate();
});