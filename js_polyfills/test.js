(function () {
    const arr = [10, 10];
    let multiplier = 1;

    const nw = arr.map((x) => {
        multiplier *= 2;
        return x * multiplier;
    });

    console.log(nw);
    console.log(arr);
})();

(function () {
    const arr = [1, 2, 3, 4];
    const [a, b] = arr;

    console.log(a, b, arr)
})();