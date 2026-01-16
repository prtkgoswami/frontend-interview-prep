// NATIVE BEHAVIOR
const Car = {
    name: "Car",
    drive: function (speed = 20) {
        console.log(this.name + " is driving at " + speed + " kmph")
    }
}

const Ferrari  = {
    name: "Ferrari"
}

Car.drive();
// Ferrari.drive(); // TypeError: Ferrari.drivce is not a function
Car.drive.call(Ferrari);
Car.drive.call(Ferrari, 120);
console.log("--------------------------------")


// POLYFILL IMPLEMENTATION
Function.prototype.myCall = function (context = {}, ...args) {
    if (typeof this !== "function") {
        throw new TypeError(this + ' is not callable');
    }

    context.fn = this;
    context.fn(...args);
}


// TEST
Car.drive.myCall(Ferrari);
Car.drive.myCall(Ferrari, 120);