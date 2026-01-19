/*
arr = [1, 3, 5, 5, 5, 5, 67, 123, 125], x = 5

Approach 1
-1  0   1   2   3   4   5   6   7   8
    1   3   5   5   5   5   67  123 125
                                        i
            s
                        e

start = -1, end = -1
for i = 0 -> arr.length
    if arr[i] !== x
        continue;
    
    if (start === -1)
        start = i;

    end = i;
return [start, end];

TC: O(N)
SC: O(1)

=========================================================

Approach 2
0   1   2   3   4   5   6   7   8
1   3   5   5   5   5   67  123 125
                        l
                        r
                    m             
        s           e
        
start = -1, end = -1
Binary Search Start
left = 0, right = arr.length - 1
while left < right
    mid = left + floor((right - left) / 2)
    if arr[mid] >= x
        right = mid
    else
        left = mid + 1
start = arr[left] === x ? left : start;
if start === -1
    return [-1, -1];

Binary Search End
left = start, right = arr.length - 1
while left < right
    mid = left + floor((right - left) / 2)
    if arr[mid] <= x
        left  = mid + 1
    else
        right = mid
end = arr[left] === x ? left : left - 1;

return [start, end]

TC: O(log N)
SC: O(1)
*/

function findStartEnd(arr, x) {
    let start = -1, end = -1;
    let left = 0, right = arr.length - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] >= x)
            right = mid;
        else
            left = mid + 1;
    }
    if (arr[left] === x)
        start = left;

    if (start === -1)
        return [-1, -1];

    left = start; right = arr.length - 1;
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] <= x)
            left = mid + 1;
        else
            right = mid;
    }
    end = arr[left] === x ? left : left - 1;

    return [start, end]
}

function run(fn) {
    console.time("Time");
    console.log("Output: ", fn());
    console.timeEnd("Time")
    console.log()
}

run(() => findStartEnd([1, 3, 5, 5, 5, 5, 67, 123, 125], 5))
run(() => findStartEnd([1, 3, 5, 5, 5, 5, 7, 123, 125], 7))
run(() => findStartEnd([1, 2, 3], 4))