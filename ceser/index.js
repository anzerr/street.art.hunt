
const wordlist = require('../util/wordlist.js');

let find = (word) => {
	let out = [];
	for (let i = 0; i < 27; i++) {
		let a = Buffer.from(word);
		for (let x = 0; x < a.length; x++) {
			a[x] = (((a[x] - 65) + i) % 26) + 65;
		}
		a = a.toString();
		for (let v in wordlist) {
			if (a.match(new RegExp(wordlist[v], 'img'))) {
				out.push(wordlist[v]);
			}
		}
		// console.log(i, a, out);
	}
	return out;
};
console.log(find('JPAVFLU'));
console.log(find('ATOUT'));

// JPAVFLU : CITOYEN : 19
// ATOUT : UNION : 20
