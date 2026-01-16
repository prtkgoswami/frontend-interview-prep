const arr = [1, 2, [3, 4, [5, 6]]];

// Native Implementation
console.log("---------------------------------------")
console.log("Native Implementation");
console.log("---------------------------------------")
console.log(arr.flat());
console.log(arr.flat(2));
console.log(arr.flat(Infinity));

// Polyfill Implementation
function recursiveFlat(arr, depth = 1) {
    if (depth === 0) return arr;

    return arr.reduce((acc, item) => {
        if (Array.isArray(item)) {
            return acc.concat(recursiveFlat(item, depth - 1));
        } else {
            return acc.concat(item);
        }
    }, [])
}
Array.prototype.myflat = function (depth = 1) {
    return recursiveFlat(Object(this), depth);
}

// Testing
console.log()
console.log("---------------------------------------")
console.log("Polyfill Implementation");
console.log("---------------------------------------")
console.log(arr.myflat());
console.log(arr.myflat(2));
console.log(arr.myflat(Infinity));