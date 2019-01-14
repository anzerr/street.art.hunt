
const crypto = require('crypto'),
	{spawn} = require('child_process');

let run = (a, b) => {
	return new Promise((resolve) => {
		// console.log(a + ' ' + b.join(' '));
		const ls = spawn(a, b);
		ls.stderr.pipe(process.stderr);
		ls.stdout.pipe(process.stdout);
		ls.on('close', resolve);
	});
};

// in nodejs
(() => {
	let decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.concat([
		Buffer.from('03012009'),
		Buffer.from([0, 0, 0, 0, 0, 0, 0, 0]) // padd the password to valid length
	]), Buffer.from('12345678b0z2345n')); // static iv
	// decipher.setAutoPadding(false);
	let decrypted = decipher.update('mq+cC6Ax2+8R8LAnEWgQnA==', 'base64');
	console.log(Buffer.concat([decrypted, decipher.final()]).toString());
})();

// openssl command
run('sh', ['-c', 'echo \'mq+cC6Ax2+8R8LAnEWgQnA==\' | openssl base64 -d | openssl aes-128-cbc -d -iv 313233343536373862307a323334356e -K 3033303132303039']);

