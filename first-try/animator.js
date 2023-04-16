export default class Animator {
    constructor(window){
        this.window = window;
        this.lastTime = null;
        this.targetFun = null;
    }

    doAnimate(time) {
        if (this.lastTime) {
            const delta = time - this.lastTime;
            
            this.targetFun(delta);
        }
        this.lastTime = time;
        this.window.requestAnimationFrame(this.doAnimate.bind(this))
    }

    animate(fun) {
        this.targetFun = fun;
        this.window.requestAnimationFrame(this.doAnimate.bind(this))
    }
}
