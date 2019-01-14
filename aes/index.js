
const crypto = require('crypto'),
	fs = require('fs'),
	{spawn} = require('child_process');

fs.writeFileSync('pass', Buffer.concat([
	Buffer.from('mq+cC6Ax2+8R8LAnEWgQnA==', 'base64'),
	Buffer.from([])
]));

console.log(Buffer.from('mq+cC6Ax2+8R8LAnEWgQnA==', 'base64').toString('hex'));

let result = Buffer.from('aG9yaXpvbiAxYT5uZQMDWw==', 'base64'), n = [];
for (let i = 0; i < result.length; i++) {
	n.push(result[i]);
}
console.log(result, n); // https://aesencryption.net/index.php
// 9aaf9c0ba031dbef11f0b0271168109c
let list = [
	'aes-128-cbc',
	'aes-128',
	'aes-128-cfb',
	'aes-128-cfb1',
	'aes-128-cfb8',
	'aes-128-ecb',
	'aes-128-ofb'
];

let run = (a, b) => {
	return new Promise((resolve) => {
		console.log(a + ' ' + b.join(' '));
		const ls = spawn(a, b);
		ls.stderr.pipe(process.stderr);
		ls.stdout.pipe(process.stdout);
		ls.on('close', resolve);
	});
};

// echo 'mq+cC6Ax2+8R8LAnEWgQnA==' | openssl base64 -d | openssl aes-128-cbc -d -nopad -nosalt -iv 31323334353637383930313233343536 -K 3033303132303039

let base = 'mq+cC6Ax2+8R8LAnEWgQnA==';
let data = Buffer.from(base, 'base64');

const decrypt = (algo) => {
	run('openssl', [algo, '-d',
		'-nopad',
		'-nosalt',
		'-md', 'md5',
		'-iv', Buffer.from('1234567890123456').toString('hex'),
		'-K', Buffer.from('03012009').toString('hex'),
		'-in', 'pass', '-out', algo + '.out'
	 ]).then(() => {
		console.log('out', fs.readFileSync(algo + '.out').toString());
	});
};

/*
<?php
var_dump(trim(openssl_decrypt('mq+cC6Ax2+8R8LAnEWgQnA==', 'AES-128-CBC', '03012009', OPENSSL_ZERO_PADDING, '1234567890123456')));

$mode = 'cbc';
$cipher = MCRYPT_RIJNDAEL_128;
$iv = mcrypt_create_iv(mcrypt_get_iv_size($cipher, $mode), MCRYPT_RAND);
var_dump(mcrypt_decrypt($cipher, '03012009', base64_decode('mq+cC6Ax2+8R8LAnEWgQnA=='), MCRYPT_MODE_CBC, $iv));
*/
decrypt('aes-128-cbc');

