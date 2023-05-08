/** @type {HTMLCanvasElement} */

import {Animator, EasingFunction} from "../_utils/animator.js";

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


class Arc {
    constructor(x, y, radius, startAngle, endAngle, color) {
        this.posX = x;
        this.posY = y;
        this.radius = radius;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.color = color;
    }

    tick(context, deltaTime) {
        this.draw(context);
    }

    /**@param {CanvasRenderingContext2D} context */
    draw(context) {
        context.save();
        context.beginPath();
        
        context.translate(this.posX, this.posY);
        context.rotate((360 * Math.random() * Math.PI) / 180);

        context.strokeStyle = this.color;

        context.arc(0, 0, this.radius, this.startAngle, this.endAngle);
        context.lineWidth = 50;

        context.stroke();
        context.restore();
    }
}

class CanvasDrawer {
    constructor() {
        this.objectsToDraw = [];

        for (let i = 0; i < 10; i++){
            const circlePercentage = Math.random();
            const startAngle = 0;
            const endAngle = circlePercentage * 2 * Math.PI;

            this.objectsToDraw.push(new Arc(400, 400, 50 + i * 50, startAngle, endAngle, "#ff0000"));
            this.objectsToDraw.push(new Arc(400, 400, 50 + i * 50, startAngle, endAngle, "#ffff00"));
            this.objectsToDraw.push(new Arc(400, 400, 50 + i * 50, startAngle, endAngle, "#00ff00"));
            this.objectsToDraw.push(new Arc(400, 400, 50 + i * 50, startAngle, endAngle, "#00ffff"));
            this.objectsToDraw.push(new Arc(400, 400, 50 + i * 50, startAngle, endAngle, "#0000ff"));
            this.objectsToDraw.push(new Arc(400, 400, 50 + i * 50, startAngle, endAngle, "#000000"));
        }
    }

    /**@param {CanvasRenderingContext2D} context */
    draw(context, deltaTime) {
        context.fillStyle = "white";
        context.fillRect(0, 0, canvas.width, canvas.height);

        this.objectsToDraw.forEach((object) => object.tick(context, deltaTime));
    }
}

const animator = new Animator(window, ctx);
const canvasDrawer = new CanvasDrawer();
animator.animate((deltaTime) => canvasDrawer.draw(deltaTime))