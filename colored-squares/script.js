/** @type {HTMLCanvasElement} */

import {Animator, EasingFunction} from "../utils/animator.js";

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
        this.animationTimeLapsed = 0;

        this.animationScaleTimeLapsed = Math.random() >= 0.5 ? animDuration/2 : 0;
        this.animationDuration = Math.random() >= 0.5 ? animDuration/2 : animDuration;

        this.animationRotationDirection = Math.random() >= 0.5 ? 1 : -1;
        this.animationScaleDirection = Math.random() >= 0.5 ? 1 : -1;
        this.animationColorDirection = Math.random() >= 0.5 ? 1 : -1;
    }

    tick(context, deltaTime) {
        this.animationTimeLapsed += deltaTime;

        this.animationScaleTimeLapsed += deltaTime * this.animationScaleDirection;
        if (this.animationScaleTimeLapsed > this.animationDuration) {
            this.animationScaleTimeLapsed = this.animationDuration;
            this.animationScaleDirection *= -1;
        }
        if (this.animationScaleTimeLapsed < 0) {
            this.animationScaleTimeLapsed = 0;
            this.animationScaleDirection *= -1;
        }

        this.currentWidth = EasingFunction.easeOutQuad(this.animationScaleTimeLapsed, this.minWidth, this.maxWidth, this.animationDuration);
        this.currentHeight = EasingFunction.easeOutQuad(this.animationScaleTimeLapsed, this.minHeight, this.maxHeight, this.animationDuration);

        this.draw(context);
    }

    /**@param {CanvasRenderingContext2D} context */ 
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

        context.lineWidth = 27
        context.rotate(this.animationTimeLapsed * 0.001 * -this.animationRotationDirection);

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
        const animationDuration =  10000;

        for(let x = 0; x < 8; x++) {
            for(let y = 0; y < 8; y++) {
                const posX = 100 * x + 50;
                const posY = 100 * y + 50;

                this.objectsToDraw.push(new Rect(posX, posY, middleSquareSize, middleSquareSize, bigSquareSize, bigSquareSize, animationDuration));
                this.objectsToDraw.push(new Rect(posX, posY, smallSquareSize, smallSquareSize, middleSquareSize, middleSquareSize, animationDuration));
                this.objectsToDraw.push(new Rect(posX, posY, 0, 0, smallSquareSize, smallSquareSize, animationDuration));
            }
        }
    }

    /**@param {CanvasRenderingContext2D} context */ 
    draw(context, deltaTime) {
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.objectsToDraw.forEach((object) => object.tick(context, deltaTime));
    }
}

const animator = new Animator(window, ctx);
const canvasDrawer = new CanvasDrawer();
animator.animate((context, deltaTime) => canvasDrawer.draw(context, deltaTime))