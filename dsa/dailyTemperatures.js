/*
temperatures = [73,74,75,71,69,72,76,73]

Approach 1
0   1   2   3   4   5   6   7
73  74  75  71  69  72  76  73
1   1   4   2   1   1   0   0

res = Array(temperatures.length).fill(0)
for i = 0 -> temperatures.length - 1
    for j = i + 1 => temperatures.length
        if temperatures[j] > temperatures[i]
            res[i] = j - i;
            break;
return res

TC: O(N^2)
SC: O(N)

Approach 2
0   1   2   3   4   5   6   7
73  74  75  71  69  72  76  73
1   1   4   2   1   1   0   0

res = Array(temperatures.length).fill(0)
stack = []
for i = 0 -> temperatures.length
    while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
        const idx = stack.pop()
        res[idx] = i - idx;
    }
    stack.push(i);
}
return res;

TC: O(N)
SC: O(N)
*/

function dailyTemperatures(temperatures) {
    const res = Array(temperatures.length).fill(0);
    const stack = [];
    for (let i = 0; i < temperatures.length; i++) {
        while (stack.length > 0 && temperatures[stack[stack.length - 1]] < temperatures[i]) {
            const idx = stack.pop();
            res[idx] = i - idx;
        }
        stack.push(i);
    }

    return res;
}

console.log(dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));