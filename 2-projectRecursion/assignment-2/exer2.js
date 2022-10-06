// Assignment 2 - Merge Sort

let array = randomArray(50);

console.log(sort(array));

function sort(array) {
	return mergeSort(array, [], 0);
}

function mergeSort(array, sortedArray, pass) {
	if (2 ** pass > array.length) {
		return array;
	}
	for (let index = 0; index < array.length; index = index + 2 * 2 ** pass) {
		let array1 = array.slice(index, index + 2 ** pass);
		let array2 = array.slice(index + 2 ** pass, index + 2 * 2 ** pass);
		sortedArray = sortedArray.concat(merge(array1, array2, []));
	}
	return mergeSort(sortedArray, [], pass + 1);
}

// Function Merge:
// let arreglo1 = [1, 2, 5, 6, 9, 11];
// let arreglo2 = [1, 3, 4, 7, 8];
// let arregloMerged = []; // Empty array to be populated and returned.

// console.log(merge(arreglo1, arreglo2, arregloMerged));

function merge(array1, array2, mergedArray) {
	if (array1.length === 0 && array2.length === 0) {
		return mergedArray;
	} else if (
		(array1.length > 0 && array2.length === 0) ||
		array1[0] <= array2[0]
	) {
		mergedArray.push(array1[0]);
		array1.shift();
	} else if (
		(array2.length > 0 && array1.length === 0) ||
		array1[0] > array2[0]
	) {
		mergedArray.push(array2[0]);
		array2.shift();
	}
	return merge(array1, array2, mergedArray);
}

// Create random array:
function randomArray(length) {
	let array = [];
	for (let index = 0; index < length; index++) {
		array[index] = Math.floor(Math.random() * 100);
	}
	return array;
}

