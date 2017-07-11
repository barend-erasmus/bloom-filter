// http://isthe.com/chongo/tech/comp/fnv/
function hash_fnv1a(str) {
    let h = 0x811c9dc5;

    for (let i = 0, l = str.length; i < l; i++) {
        h ^= str.charCodeAt(i)
        h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
    }

    return h >>> 0
}

function addToBloomFilter(str, arr) {
    const hash = hash_fnv1a(str);

    const index = hash % arr.length;

    arr[index] = 1;

    return arr;
}

function test(str, arr) {
    const hash = hash_fnv1a(str);

    const index = hash % arr.length;
   
    return arr[index] === 1;
}

let arr = new Array(8);

arr = addToBloomFilter('one', arr);
arr = addToBloomFilter('two', arr);

console.log(test('one', arr));      // True
console.log(test('two', arr));      // True
console.log(test('three', arr));    // False



