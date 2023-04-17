/** @type {HTMLCanvasElement} */

import Animator from "./animator.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


class Rect {
    constructor(x, y, height, width) {
        this.posX = x;
        this.posY = y;
        this.height = height;
        this.width = width;
    }

    draw(context) {
        context.save();
        context.beginPath();

        var grd = context.createLinearGradient(this.posX, this.posY, this.posX + this.height, this.posY + this.width);
        grd.addColorStop(0, "black");
        grd.addColorStop(0.25, "green");
        grd.addColorStop(0.5, "red");
        grd.addColorStop(0.75, "blue");
        grd.addColorStop(1, "white");

        
        context.strokeStyle = grd;
        context.lineWidth = 6
        context.rect(this.posX, this.posY, this.height, this.width);

        context.stroke();
        context.restore();
    }
}

class CanvasDrawer {
    constructor() {
        this.currentAnimationPercentage = 0;
        this.direction = 1;
    }

    draw(delta, duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const squareMinSize = 75;
        const squareMaxSize = 100;
        const percent = this.currentAnimationPercentage;

        for(let x = 0; x < 5; x++) {
            for(let y = 0; y < 5; y++) {
                const bigSquareSize = Math.max(squareMinSize, squareMaxSize * percent);
                const middleSquareSize = Math.max(50, 10 + squareMinSize * percent);
                const smallSquareSize = Math.max(10, squareMinSize * percent);

                const posX = 55 * x + 128;
                const posY = 55 * y + 128;

                const rect1 = new Rect(posX - bigSquareSize/2, posY - bigSquareSize/2, bigSquareSize, bigSquareSize);
                rect1.draw(ctx);
            
                const rect2 = new Rect(posX - middleSquareSize/2, posY - middleSquareSize/2, middleSquareSize, middleSquareSize);
                rect2.draw(ctx);

                const rect3 = new Rect(posX - smallSquareSize/2, posY - smallSquareSize/2, smallSquareSize, smallSquareSize);
                rect3.draw(ctx);
            }
        }
    
        this.currentAnimationPercentage += (delta / duration) * this.direction;
        if (this.currentAnimationPercentage < 0) {
            this.currentAnimationPercentage = 0;
            this.direction *= -1;
        }
        if (this.currentAnimationPercentage > 1) {
            this.currentAnimationPercentage = 1;
            this.direction *= -1;
        }
    }
}

const animator = new Animator(window);
const canvasDrawer = new CanvasDrawer();
animator.animate((delta) => canvasDrawer.draw(delta, 1000))