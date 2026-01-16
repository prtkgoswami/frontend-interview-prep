// NATIVE IMPLEMENTATION
const Car = {
    name: "Car",
    drive: function (speed = 20) {
        console.log(this.name + " is driving at " + speed + " kmph");
    }
}

const Honda = {
    name: "Accord"
}

Car.drive();
Car.drive(80);
Car.drive.apply(Honda);
// Car.drive.apply(Honda, 140); // TypeError: CreateListFromArrayLike called on non-object
Car.drive.apply(Honda, [140]);
console.log("--------------------------------")

// POLYFILL IMPLEMENTATION
Function.prototype.myApply = function (context = {}, args = []) {
    if (typeof this !== "function") {
        throw new TypeError(this + " is not callable");
    }

    if (!Array.isArray(args)) {
        throw new TypeError("CreateListFromArrayLike called on non-object");
    }

    context.fn = this;
    context.fn(...args);
}

// TEST
Car.drive.myApply(Honda);
// Car.drive.myApply(Honda, 140); // TypeError: CreateListFromArrayLike called on non-object
Car.drive.myApply(Honda, [140]);