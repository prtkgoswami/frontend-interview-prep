// REMOVE NATIVE IMPLEMENTATION
if (Array.prototype.forEach) {
    Array.prototype._nativeForeach = Array.prototype.forEach;
    delete Array.prototype.forEach;
}

// IMPLEMENT POLYFILL
if (!Array.prototype.forEach) {
    Array.prototype.forEach = function (callback, thisArg) {
        if (!this) {
            throw new TypeError("Array.protoype.ForEach caleed on nll/undefined");
        }

        if (typeof callback !== 'function') {
            throw new TypeError(callback + " is not a function");
        }

        const arr = Object(this);
        const len = arr.length >>> 0;

        for (let  i = 0; i < len; i++) {
            if (i in arr) {
                callback.call(thisArg, arr[i], i, arr);
            }
        }
    }
}


// TESTING
console.log([1,2,3,4].forEach((x, i) => {console.log(`${x} is at position ${i}`)}));

let count = 0;
console.log([1,2,3,4].forEach((x) => {count += x}));
console.log(count)


// RESTORE NATIVE IMPLEMENTATION
if (Array.prototype._nativeForeach) {
    Array.prototype.forEach = Array.prototype._nativeForeach;
    delete Array.prototype._nativeForeach;
}
