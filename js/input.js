export class InputHandler {
    constructor(keys){
        this.keys = keys;
        this.pressedKeys = [];

        document.addEventListener('keydown', (e) => this.down(e));
        document.addEventListener('keyup', (e) => this.up(e));
    }

    down(e){
        // if key that was mentioned is pressed
        if(this.keys.indexOf(e.key) !== -1){

            if(this.pressedKeys.indexOf(e.key) === -1){
                this.pressedKeys.push(e.key);
            }

        }
    }

    up(e){
        // if key that was mentioned is pressed
        if(this.keys.indexOf(e.key) !== -1){

            // remove key from the pressed key array
            const idx = this.pressedKeys.indexOf(e.key);
            if(idx !== -1){
                this.pressedKeys.splice(idx, 1);
            }

        }
    }
}