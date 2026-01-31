function throttle (fn, interval) {
    let timer;

    return function (...args) {
        const context = this;

        clearInterval(timer);

        timer = setInterval(() => {
            fn.apply(context, args)
        }, interval);
    }
}

const regularFn = () => {
    console.log("Regular Call");
}

regularFn();
regularFn();
regularFn();
regularFn();
regularFn();

console.log("=======================================")

const throttledFn = throttle(() => {
    console.log("Thottled Call", Date.now())
}, 500);

throttledFn();