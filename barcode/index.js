
const wordlist = require('../util/wordlist.js');

let base = [
	[2, 6, 3, 4, 5, 3, 5, 6, 6, 1, 2, 3, 4, 3, 1, 3], // left top (banquier)
	[6, 1, 1, 2, 6, 1, 1, 3, 4, 3], // left first middle (usure)
	[2, 5, 4, 3, 5, 3, 1, 2, 1, 6, 5, 3, 5, 4, 4, 3], // left second middle (mensonge)
	[1, 3, 4, 6, 5, 3, 1, 3, 6, 5, 3, 6], // left bottom
	[4, 3, 1, 2, 2, 1, 1, 6, 2, 3, 1, 3], // right bottom (espoir)
	[5, 1, 3, 5, 3, 5, 1, 5, 6, 3, 6, 3] // right top
];

const convert = (base, map, def) => {
	let o = [];
	for (let i in base) {
		let oo = [];
		for (let x in base[i]) {
			oo.push(map[base[i][x]] || def || base[i][x]);
		}
		o.push(oo);
	}
	return o;
};

let match = (a) => {
	let out = [];
	for (let v in wordlist) {
		if (wordlist[v].match(a)) {
			out.push(wordlist[v]);
		}
	}
	return out.length === 0 ? null : out;
};

let FOUND = [
	['banquier', 'usure', 'mensonge'],
	['espoir']
];

let charMap = {
	13: 'r',
	12: 's',
	53: 'n',
	61: 'u',
	43: 'e',
	25: 'm',
	16: 'o',
	54: 'g',
	21: 'p',
	23: 'i',
	26: 'b',
	34: 'a',
	56: 'q'
};

let base6 = [];
for (let x in base) {
	let line = base[x].join('').match(/.{2}/g);
	console.log(line);
	base6.push(line);
}
let toRegex = convert(base6, charMap, '.');
for (let i in toRegex) {
	console.log(base6[i], toRegex[i], (match(toRegex[i].join('')) || []).slice(0, 10));
}

const NS_PER_SEC = 1e9;

const findFirst = () => {
	let found = [];
	for (let i in wordlist) {
		let start = process.hrtime();
		for (let x in wordlist) {
			for (let v in wordlist) {
				let a = wordlist[i], b = wordlist[x], c = wordlist[v];
				let valid = (
					a.length === 8 && // match 7, 2, 4, 6
					c.length === 8 &&
					b.length === 5 &&

					b[3] === a[7] && // 13

					b[1] === c[3] && // 12

					c[2] === a[2] && // 53
					c[2] === c[5] && // 53

					b[0] === b[2] && // 61
					b[0] === a[4] && // 61

					a[6] === b[4] && // 43
					a[6] === c[7] && // 43
					c[1] === c[7] // 43
				);
				if (valid) {
					found.push([a, b, c]);
				}
			}
		}
		let end = process.hrtime(start), left = wordlist.length - Number(i);
		end = ((left * ((end[0] * NS_PER_SEC) + end[1])) / NS_PER_SEC).toFixed(3);
		console.log(left, end);
	}
	return found;
};
// console.log(findFirst())
