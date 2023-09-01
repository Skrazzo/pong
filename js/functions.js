// this function calculates if the ball has collided with the paddle
// in the first part, second, or third part of the paddle
export function calc_ball_coll_part(paddleH, paddleY, ballY){
    const diff = ballY - paddleY;
    const percentage = (diff * 100) / paddleH;

    if(percentage >= 0 && percentage < 33) return 1;
    if(percentage >= 33 && percentage < 66) return 2;
    if(percentage >= 66 && percentage <= 100) return 3;

}


// returns -1 or 1
export function get_rand_pos_neg() {
    // Generate a random number between 0 and 1
    var random = Math.random();
  
    // Return 1 if random is greater than or equal to 0.5, otherwise return -1
    return random >= 0.5 ? 1 : -1;
}

//module.exports = { calc_ball_coll_part };