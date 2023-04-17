class Animator {
    constructor(window){
        this.window = window;
        this.lastTime = null;
        this.targetFun = null;
    }

    doAnimate(time) {
        let delta = 0
        if (this.lastTime != null && document.hidden === false) {
            delta = time - this.lastTime;
        }
        
        this.lastTime = time;
        this.window.requestAnimationFrame(this.doAnimate.bind(this))

        // console.log("Animator -> ", "Time:", time, "LastTime:", this.lastTime, "Delta:", delta)
        this.targetFun(delta);
    }

    animate(fun) {
        this.targetFun = fun;
        this.window.requestAnimationFrame(this.doAnimate.bind(this))
    }
}

class EasingFunction {
    static easeOutQuad (time, startValue, endValue, duration) {
        return -endValue * (time /= duration) * (time - 2) + startValue;
    }
}

export {Animator, EasingFunction}