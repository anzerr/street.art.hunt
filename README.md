
### `Intro`
This is a dump of what I had before someone found the solution

note: I worked more after on the AES to understand why https://aesencryption.net/index.php is the only place I can get a valid response. I also tried to find `"peuple"` and `"combat"` in the barcode still can't :/

All this code is bad don't judge

For AES the closes I can get is with this:
``` bash
echo 'mq+cC6Ax2+8R8LAnEWgQnA==' | openssl base64 -d | openssl aes-128-cbc -d -iv 313233343536373862307a323334356e -K 3033303132303039
```

This was a hunt for 12 words hidden in this image
![alt text](https://raw.githubusercontent.com/anzerr/street.art.hunt/master/util/image.jpg)

## `Word Locations`
- 2 found as base64 `["conduire", "triomphe"]`
- 2 found as aes `["horizon", "jaune"]`
- 2 found as cesar `["union", "citoyen"]`
- 6 found in base6 barcodes `["banquier", "usure", "mensonge", "peuple", "combat", "espoir"]`

## `Wallet`
https://www.blockchain.com/btc/address/1NqPwPp7hEXZ3Atj77Ue11xAEMmXqAXwrQ?sort=0

## `Solution`
https://www.pboy-art.com/single-post/2019/01/13/Solution-de-l%C3%A9nigme-de-la-fresque-La-Libert%C3%A9-guidant-le-peuple-2019