// Project: Linked Lists
// Assignment:

let listaEnlazada = LinkedList();
listaEnlazada.append(12);
listaEnlazada.append(34);
listaEnlazada.append(56);
listaEnlazada.append(78);

listaEnlazada.prepend(0.1);
listaEnlazada.prepend(0.2);
listaEnlazada.prepend(0.3);

listaEnlazada.append(91);

console.log(listaEnlazada);
console.log("size", listaEnlazada.size());
console.log("head", listaEnlazada.head());
console.log("tail", listaEnlazada.tail());
console.log("at 4", listaEnlazada.at(4));

listaEnlazada.pop();
listaEnlazada.pop();
console.log("After 2 pops:", listaEnlazada);

console.log("Contains 0.2?", listaEnlazada.contains(0.2));
console.log("Contains 55?", listaEnlazada.contains(55));

console.log("Find 0.1:", listaEnlazada.find(0.1));
console.log("Find 44:", listaEnlazada.find(44));

listaEnlazada.insertAt(333, 3);
listaEnlazada.removeAt(4);

console.log(listaEnlazada);
console.log(listaEnlazada.toString());

function LinkedList() {
	function append(value) {
		let newNode = Node();
		newNode.value = value;
		this.list.push(newNode);

		let length = this.list.length;
		if (length > 1) {
			this.list[length - 2].nextNode = length - 1;
		}
	}

	function prepend(value) {
		let newNode = Node();
		newNode.value = value;
		this.list.unshift(newNode);
		reIndex.call(this);
	}

	function reIndex() {
		for (let index = 0; index < this.list.length; index++) {
			this.list[index].nextNode = index + 1;
		}
		this.list[this.list.length - 1].nextNode = null;
	}

	function size() {
		return this.list.length;
	}

	function head() {
		return this.list[0];
	}

	function tail() {
		return this.list[this.list.length - 1];
	}

	function at(index) {
		return this.list[index];
	}

	function pop() {
		this.list.pop();
		this.list[this.list.length - 1].nextNode = null;
	}

	function contains(value) {
		for (let index = 0; index < this.list.length; index++) {
			if (this.list[index].value === value) {
				return true;
			}
		}
		return false;
	}

	function find(value) {
		for (let index = 0; index < this.list.length; index++) {
			if (this.list[index].value === value) {
				return index;
			}
		}
		return null;
	}

	function toString() {
		let string = "";
		for (let index = 0; index < this.list.length; index++) {
			string = string + `( ${this.list[index].value} ) -> `;
		}
		string = string + "null";
		return string;
	}

	function insertAt(value, index) {
		const newNode = Node();
		newNode.value = value;
		this.list.splice(index, 0, newNode);
		reIndex.call(this);
	}

	function removeAt(index) {
		this.list.splice(index, 1);
		reIndex.call(this);
	}

	return {
		list: [],
		append,
		prepend,
		size,
		head,
		tail,
		at,
		pop,
		contains,
		find,
		toString,
		insertAt,
		removeAt
	};
}

function Node() {
	return { value: null, nextNode: null };
}
