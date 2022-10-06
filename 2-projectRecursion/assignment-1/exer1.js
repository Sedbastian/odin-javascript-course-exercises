// Iterative method:

console.log(fibs(21));

function fibs(size) {
	let array = [];
	for (let i = 0; i < size; i++) {
		if (i === 0 || i === 1) {
			array.push(1);
		} else {
			array.push(array[i - 2] + array[i - 1]);
		}
	}
	return array;
}


// Recursive method:

console.log(fibsRec(100));

function fibsRec(s) {
	if (s === 0) {
		return [1];
	} else if (s === 1) {
		return [1, 1];
	} else if (s >= 2) {
		let a = fibsRec(s - 1);
		a.push(a[s - 2] + a[s - 1]);
		return a;
	}
}
