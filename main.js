import { Ball } from "./js/ball.js";
import { Player } from "./js/player.js";

class GameClass{
    
    

    
    constructor(){
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

        // adding players and ball to the game
        this.ball = new Ball(this.ctx);
        this.lastFrameTime = Date.now();
    }

    // update every element positions and states
    update(){
        this.ball.move();
    }
    
    // request every element to draw
    draw(){
        this.ball.draw();
    }

    // clear canvas, request update and draw functions
    animate(){

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

        


        requestAnimationFrame(() => this.animate());
    }

    // clear canvas
    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    
    }

    info(){
        console.log('ctx', this.ctx);
    
        const currentTime = Date.now();
        const deltaTime = currentTime - this.lastFrameTime;
        const frameInterval = 1000 / this.frameRate;

        console.log(deltaTime);
        console.log(frameInterval);    
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