// https://www.codingame.com/playgrounds/5422/js-interview-prep-recursion
// Exer 4:
console.log("Exer 4:");
let arreglo = [2, 1, 2, 3, 9, 5];

console.log(all(arreglo, esMenorA6));

function esMenorA6(numero) {
	return numero < 6;
}

function all(array, callback) {
	let copy = array.slice();
	let firstElement = copy.shift();
	if (!callback(firstElement)) {
		return false;
	} else if (copy.length) {
		return all(copy, callback);
	} else {
		return true;
	}
}

// Exer 5:
console.log("Exer 5:");
console.log(productArray(arreglo));

function productArray(array) {
	if (array.length === 0) return 1;
	return array.shift() * productArray(array);
}

// Exer 6:
console.log("Exer 6:");
let nestedObject = {
	data: {
		info: {
			stuff: {
				thing: {
					moreStuff: {
						magicNumber: 44,
						something: "foo2",
					},
				},
			},
		},
	},
};

let hasIt = contains(nestedObject, 44);
console.log(hasIt);
let doesntHaveIt = contains(nestedObject, "foo");
console.log(doesntHaveIt);

function contains(obj, value) {
	for (const key of Object.keys(obj)) {
		if (typeof obj[key] === "object") {
			return contains(obj[key], value);
		}
		if (obj[key] === value) {
			return true;
		}
	}
	return false;
}

// Exer 7:
console.log("Exer 7:");

let arregli = [[[5], 3], 0, 2, ["foo"], [], [4, [5, 6]]];

let seven = totalIntegers(arregli);
console.log(seven);

function totalIntegers(array) {
	let count = 0;
	if (array.length === 0) {
		return count;
	}
	let firstElement = array.shift();
	if (Array.isArray(firstElement)) {
		count = totalIntegers(firstElement) + count;
	} else if (Number.isInteger(firstElement)) {
		count += 1;
	}
	return count + totalIntegers(array);
}

// Exer 8:
console.log("Exer 8:");
let l = [10,[[10],10],[10]]; 
console.log(sumSquares(l));

function sumSquares(nestedArray) {
	let sum = 0;
	if (nestedArray.length === 0) {
		return sum;
	}
	let firstElement = nestedArray.shift();
	if (Array.isArray(firstElement)) {
		sum = sumSquares(firstElement) + sum;
	} else {
		sum += firstElement * firstElement;
	}
	return sum + sumSquares(nestedArray);
}

// Exer 9:
console.log("Exer 9:");
let array = [];
console.log(replicate(7, 69, array))


function replicate(times, number, array) {
	if (times <= 0) return array;
	array.push(number);
	let newtimes = times - 1;
	return replicate(newtimes, number, array);
}