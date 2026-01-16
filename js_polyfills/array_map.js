// REMOVE NATIVE MAP IMPLEMENTATION
if (Array.prototype.map) {
    Array.prototype._nativeMap = Array.prototype.map;
    delete Array.prototype.map;
}


// MAP POLYFILL
if (!Array.prototype.map) {
    Array.prototype.map = function(callback, thisArg) {
        if (this === null) {
            throw new TypeError("Array.prototype.map called on null/undefined");
        }
        if (typeof callback !== 'function') {
            throw new TypeError(callback + " is not a function");
        }

        const arr = Object(this);
        const len = arr.length >>> 0;
        const result = new Array(len);

        for (let i = 0; i < len; i++) {
            if (i in arr) {
                result[i] = callback.call(thisArg, arr[i], i, arr);
            }
        }

        return result;
    }
}


// TESTING
// Test 1: Basic  Mapping
console.log([1,2,3,4].map(x => x * 2));

// Test 2: Does not impact original
const original = [2,4,3,5];
original.map(x => x + 2);
console.log(original);

// Test 3: Sparse Array Handling
const sparse = [1,,2];
const res = sparse.map(x => x+1);
console.log(res);


// ADD NATIVE IMPLEMENTATION BACK
if (Array.prototype._nativeMap) {
    Array.prototype.map = Array.prototype._nativeMap;
    delete Array.prototype._nativeMap;
}

