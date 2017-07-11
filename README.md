# Bloom Filter

A Bloom filter is a space-efficient probabilistic data structure, conceived by Burton Howard Bloom in 1970, that is used to test whether an element is a member of a set. False positive matches are possible, but false negatives are not – in other words, a query returns either "possibly in set" or "definitely not in set".

## The Basics

Define an array of `n` bits which are all set to `0`.

Below is an array containing 8 bits.

|   Bit     |   0   |   0   |   0   |   0   |   0   |   0   |   0   |   0   |
| --------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
|   Index   |   0   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |

Compute the hash of `one` using the FNV Algorithm, which returns `7`. 

Set the index, `7`, to `1`

The array will be updated and look like this.

|   Bit     |   0   |   0   |   0   |   0   |   0   |   0   |   0   |   1   |
| --------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
|   Index   |   0   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |

Compute the hash of `two` using the FNV Algorithm, which returns `1`. 

Set the index, `1`, to `1`

The array will be updated and look like this.

|   Bit     |   0   |   1   |   0   |   0   |   0   |   0   |   0   |   1   |
| --------- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
|   Index   |   0   |   1   |   2   |   3   |   4   |   5   |   6   |   7   |

To test if there's a chance that `three` could exist, compute the hash of `three`, which is equal to `3`.

Check if index `3` is equal to `1`, which in this case is `false`.


To test if there's a chance that `one` could exist, compute the hash of `one`, which is equal to `7`.

Check if index `7` is equal to `1`, which in this case is `true`.

## Implementation

```javascript

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

```

## Useful Links

[Jason Davies](https://www.jasondavies.com/bloomfilter/)

[Geeks for Geeks](http://www.geeksforgeeks.org/bloom-filters-introduction-and-python-implementation/)

[Prakhar](https://prakhar.me/articles/bloom-filters-for-dummies/)