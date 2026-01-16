const debounce = function (fn, interval) {
    let timer;

    return function (...args) {
        const context = this;

        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(context, args)
        }, interval)
    }
}

const regularFn = () => {
    console.log("Regular Call")
};

regularFn();
regularFn();
regularFn();
regularFn();
regularFn();

console.log("================================")


const debouncedFn = debounce(() => {
    console.log("Debounced Call")
}, 1000)

debouncedFn();
debouncedFn();
debouncedFn();
debouncedFn();
debouncedFn();