# from2-encoding

Create a stream from a string or buffer, with an encoding parameter for converting strings to buffers.
Part of the [from2](https://github.com/hughsk/from2) ecosystem.

## Installation
```bash
$ npm install from2-encoding
```

## Usage
```js
const from2Encoding = require('from2-encoding')

from2Encoding('hello world', 'utf8').pipe(process.stdout)
from2Encoding('aGVsbG8gd29ybGQ=', 'base64').pipe(process.stdout)
from2Encoding('deadbeef', 'hex').pipe(process.stdout)
from2Encoding(Buffer.from('deadbeef', 'hex'), 'binary').pipe(process.stdout)
```

## API

`from2Encoding(data, encoding)`

## License

[MIT](https://tldrlegal.com/license/mit-license)
