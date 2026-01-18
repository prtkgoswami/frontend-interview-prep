/*
nums = [1, 2, 3] 
k = 3

Approach 1
0   1   2
1   2   3

sum = 0, count = 0
i   j   sum count
0   0   1   0
    1   3   1
    2   6   1
1   1   2   1
    2   5   1
2   2   3   2
    3   -   2 <----

count = 0
for i = 0 -> nums.length
    sum = 0
    for j = i -> nums.length
        sum += nums[j];
        count += sum === k ? 1 : 0;
return count

TC: O(N^2)
SC: O(1)

================================================================

Approach 2 - REJECTED
Sliding Window, but sum of k can still be met if current sum > k as negative numbers can lower it
k = 7 arr=[7, 2, -3, 1]

================================================================

Approach 3
i           0   1   2   3   4   5   6   7
nums[i]     3   4   7   2   -3  1   4   2
prefixSum   3   7   14  16  13  14  18  20

subarray sum is k if either
1. prefixSum === k
2. prefixSum - k exists before current

sum sum-k count seen
3   -4      0   {}
7   0       1   {3:1}
14  7       2   {3:1, 7:1}
16  9       2   {3:1, 7:1, 14:1}
13  6       2   {3:1, 7:1, 14:1, 16:1}
14  7       3   {3:1, 7:1, 14:1, 16:1, 13:1}
18  11      3   {3:1, 7:1, 14:2, 16:1, 13:1}
20  13      4   {3:1, 7:1, 14:1, 16:1, 13:1, 18:1}

sum = 0, count = 0;
seen = Map();
nums.forEach(num => {
    sum += num;
    if (sum === k)
        count++;
    if (seen.get(sum - k))
        count += seen.get(sum-k)
    const prevVal = seen.get(sum) ?? 0; 
    seen.set(sum, prevVal + 1);    
})
return count;

TC: O(N)
SC: O(N)
*/

function subArrayLength(nums, k) {
    let sum = 0;
    let count = 0;
    const seen = new Map();
    for (const num of nums) {
        sum += num;

        if (sum === k)
            count++;

        if (seen.get(sum - k))
            count += seen.get(sum - k)

        const prevVal = seen.get(sum) ?? 0;
        seen.set(sum, prevVal + 1);
    }
    return count;
}

console.log(subArrayLength([1, 2, 3], 3))
console.log(subArrayLength([3, 4, 7, 2, -3, 1, 4, 2], 7))