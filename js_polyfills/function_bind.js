// NATIVE IMPLEMENTATION
const Car = {
    name: "Car",
    drive: function (speed = 20) {
        console.log(this.name + " is driving at " + speed + " kmph");
    } 
}

const Ferrari = {
    name: "Ferrari",
}

Car.drive();
Car.drive(120);
Car.drive.bind(Ferrari)();
Car.drive.bind(Ferrari, 140)();
console.log("--------------------------------")

// POLYFILL IMPLEMENTATION
Function.prototype.myBind = function (context = {}, ...args) {
    if (typeof this !== "function") {
        throw new TypeError(this + " cannot be bound as it is not callable");
    }

    context.fn = this;
    return function (...newArgs) {
        context.fn(...args, ...newArgs)
    };
}

// TEST
Car.drive.myBind(Ferrari)();
Car.drive.myBind(Ferrari, 140)();
const fn = Car.drive.myBind(Ferrari);
fn(160);