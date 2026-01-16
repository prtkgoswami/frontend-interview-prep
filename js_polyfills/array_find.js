// REMOVE NATIVE IMPLEMENTATION
if (Array.prototype.find) {
    Array.prototype._nativeFind = Array.prototype.find;
    delete Array.prototype.find;
}

// IMPLEMENT POLYFILL
if (!Array.prototype.find) {
    Array.prototype.find = function(callback, thisArg) {
        if (!this) {
            throw new TypeError("Array.prototype.find called on null/undefined");
        }

        if (typeof callback !== "function") {
            throw new TypeError(callback + " is not a function");
        }

        const arr = Object(this);
        const len = arr.length >>> 0;
        const res = undefined;

        for (let i = 0; i < len; i++) {
            if (i in arr) {
                if (callback(arr[i], i, arr)) {
                    return arr[i];
                }
            }
        }

        return undefined;
    }
}


// TEST
console.log([1,2,3,4,5].find(x => x > 3));

// console.log(undefined.find(x=> x === 3));

// console.log([1,23,43,5].find(3));


// RESTORE NATIVE IMPLEMENTATION
if (Array.prototype._nativeFind) {
    Array.prototype.find = Array.prototype._nativeFind;
    delete Array.prototype._nativeFind;
}
