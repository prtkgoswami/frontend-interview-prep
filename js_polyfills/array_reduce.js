// REMOVE NATIVE IMPLEMENTATION
if (Array.prototype.reduce) {
  Array.prototype._nativeReduce = Array.prototype.reduce;
  delete Array.prototype.reduce;
}

// IMPLEMENT POLYFILL
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function (callback, initialValuue) {
    if (this === null) {
      throw new TypeError("Array.prototype.reduce called on null/undefined");
    }

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const arr = Object(this);
    const len = arr.length >>> 0;
    let startIndex = 0;
    let acc;

    if (arguments.length >= 2) {
      acc = initialValuue;
    } else {
      while (startIndex < len && !(startIndex in arr)) {
        startIndex++;
      }

      if (startIndex >= len) {
        throw new TypeError(
          "Reduce called on empty array with no initial value"
        );
      }

      acc = arr[startIndex++];
    }

    for (let i = startIndex; i < len; i++) {
      if (i in arr) {
        acc = callback(acc, arr[i], i, arr);
      }
    }

    return acc;
  };
}

// TESTING
console.log([1, 2, 3, 4].reduce((acc, x) => acc + x, 0));

// RESTORE NATIVE IMPLEMENTATION
if (Array.prototype._nativeReduce) {
  Array.prototype.reduce = Array.prototype._nativeReduce;
  delete Array.prototype._nativeReduce;
}
