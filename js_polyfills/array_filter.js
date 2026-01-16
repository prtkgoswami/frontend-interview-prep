// REMOVE NATIVE IMPLEMENTATION
if (Array.prototype.filter) {
    Array.prototype._nativefilter = Array.prototype.filter;
    delete Array.prototype.filter;
}

// IMPLEMENT POLYFILLS
if (!Array.prototype.filter) {
    Array.prototype.filter = function (callback, args) {
        if (this === null) {
            throw new TypeError("Array.prototype.filter called on null/undefined");
        }

        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        const arr = Object(this);
        const len = arr.length >> 0;
        const result = new Array();

        for (let i = 0; i < len; i++) {
            if (i in arr) {
                if (callback.call(args, arr[i], i, arr)) {
                    result.push(arr[i]);
                }
            }
        }

        return result;
    }
}

// TESTING
// 1. Basic filering
console.log([true, true, false, true].filter(x => x));

console.log([1, 2, 5, 7, 8, 12].filter(x => x % 2 === 0));



// RESTORE NATIVE IMPLEMENTATION
if (Array.prototype._nativefilter) {
    Array.prototype.filter = Array.prototype._nativefilter;
    delete Array.prototype._nativefilter;
}