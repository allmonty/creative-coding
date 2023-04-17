/** @type {HTMLCanvasElement} */

import {Animator, EasingFunction} from "./animator.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


class Rect {
    constructor(x, y, minWidth, minHeight, maxWidth, maxHeight, animDuration) {
        this.posX = x;
        this.posY = y;
        this.minWidth = minWidth
        this.minHeight = minHeight
        this.maxWidth = maxWidth
        this.maxHeight = maxHeight

        this.currentWidth = maxWidth;
        this.currentHeight = maxHeight;
        this.animationTimeLapsed = Math.random() >= 0.5 ? animDuration/2 : 0;
        this.animationDuration = Math.random() >= 0.5 ? animDuration/2 : animDuration;;
        this.animationDirection = 1;
        this.animationColorDirection = Math.random() >= 0.5 ? 1 : -1;;
    }

    tick(context, deltaTime) {
        this.animationTimeLapsed += deltaTime * this.animationDirection;
        if (this.animationTimeLapsed > this.animationDuration) {
            this.animationTimeLapsed = this.animationDuration;
            this.animationDirection *= -1;
        }
        if (this.animationTimeLapsed < 0) {
            this.animationTimeLapsed = 0;
            this.animationDirection *= -1;
        }

        this.currentWidth = EasingFunction.easeOutQuad(this.animationTimeLapsed, this.minWidth, this.maxWidth, this.animationDuration);
        this.currentHeight = EasingFunction.easeOutQuad(this.animationTimeLapsed, this.minHeight, this.maxHeight, this.animationDuration);

        this.draw(context);
    }

    draw(context) {
        context.save();
        context.beginPath();
        context.translate(this.posX, this.posY);

        const offsetX = -this.currentWidth * 0.5;
        const offsetY = -this.currentHeight * 0.5;

        var grd = context.createLinearGradient(offsetX, offsetY, this.currentWidth + offsetX, this.currentHeight + offsetY);
        grd.addColorStop(0, "#000000");
        grd.addColorStop(0.25, "#3330e4");
        grd.addColorStop(0.5, "#f637ec");
        grd.addColorStop(0.75, "#fbb454");
        grd.addColorStop(1, "#faea48");
        context.strokeStyle = grd;

        context.lineWidth = 20
        context.rotate(this.animationTimeLapsed * 0.001);

        context.rect(offsetX, offsetY, this.currentWidth, this.currentHeight);

        context.rotate(this.animationTimeLapsed * 0.002 * this.animationColorDirection);

        context.stroke();
        context.restore();
    }
}

class CanvasDrawer {
    constructor() {
        this.currentAnimationPercentage = 0;
        this.direction = 1;
        this.objectsToDraw = [];

        const bigSquareSize = 150;
        const middleSquareSize = 100;
        const smallSquareSize = 50;
        const animationDuration =  5000;

        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                const posX = 100 * x + 50;
                const posY = 100 * y + 50;

                this.objectsToDraw.push(new Rect(posX, posY, 0, 0, bigSquareSize, bigSquareSize, animationDuration));
                this.objectsToDraw.push(new Rect(posX, posY, 0, 0, middleSquareSize, middleSquareSize, animationDuration));
                this.objectsToDraw.push(new Rect(posX, posY, 0, 0, smallSquareSize, smallSquareSize, animationDuration));
            }
        }
    }

    draw(deltaTime) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        this.objectsToDraw.forEach((object) => object.tick(ctx, deltaTime));
    }
}

const animator = new Animator(window);
const canvasDrawer = new CanvasDrawer();
animator.animate((deltaTime) => canvasDrawer.draw(deltaTime))