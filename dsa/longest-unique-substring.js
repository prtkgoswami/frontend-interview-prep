
/*
Approach 1
0   1   2   3   4   5   6   7
a   b   c   a   b   c   b   b
    i
    j

seen = [a, b, c]
start = 0
end = 2

start = 0, end = 0
for i = 0 -> s.length
    seen = []
    for j = i -> s.length
        if (seen.includes(s[j]))
            if (end - start + 1 > j - i)
                start = i, end = j - 1
            break
        seen.push(s[j])
return s.slice(start, end + 1);

TC: O(N^2)
SC: O(N)

======================================================================================

Approach 2
0   1   2   3   4   5   6   7   8
a   b   c   a   b   c   b   b
                            s   
                                e

seen = []
start = 0 | 0
end = 0 | 2

start = 0, end = 0
startIdx = 0, endIdx = 0
seen = []
while (endIdx < s.length) {
    if (seen.has(s[endIdx])) {
        Update start & end if greater
        increment startIdx & remove from seen until s[startIdx] === s[endIdx]
        Increment startIdx & remove from seen
    }
    add s[endIdx] to seen
    Increment endIdx  
}
Update start & end if greater
return s.slice(start, end + 1)

TC: O(N)
SC: O(N)
*/

function longestUniqueSubstring(s) {
    let start = 0, end = 0, startIdx = 0, endIdx = 0;
    const seen = new Set([]);

    while (endIdx < s.length) {
        if (seen.has(s[endIdx])) {
            const maxLen = end - start + 1;
            const currLen = endIdx - startIdx;
            if (currLen > maxLen) {
                start = startIdx;
                end = endIdx - 1;
            }

            while (s[startIdx] !== s[endIdx]) {
                seen.delete(s[startIdx]);
                startIdx++;
            }
            seen.delete(s[startIdx]);
            startIdx++;
        }
        seen.add(s[endIdx]);
        endIdx++;
    }
    const maxLen = end - start + 1;
    const currLen = endIdx - startIdx;
    if (currLen > maxLen) {
        start = startIdx;
        end = endIdx - 1;
    }
    return s.slice(start, end + 1);
}

console.log(longestUniqueSubstring("abcabcbb"))
console.log(longestUniqueSubstring("bbbb"))
console.log(longestUniqueSubstring(""))