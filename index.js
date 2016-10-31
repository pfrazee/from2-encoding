const from2 = require('from2')

// convert data into a readable stream, based on the encoding
module.exports = function fromEncoding (data, encoding) {
  // different encodings require different chunk 'windows'
  // in hex, every 2 chars == 1 byte
  // in base64, every 4 chars == 3 bytes
  var chunkSize = ({ hex: 2, base64: 4 })[encoding]
  if (!encoding) throw new Error('Encoding parameter is required')

  var i = 0
  return from2((size, next) => {
    // done?
    if (i >= data.length) return next(null, null)

    // reduce the read-size to fit the chunk window
    if (chunkSize) size -= (size % chunkSize)

    // fetch the next chunk
    var chunk = data.slice(i, i + size)
    i += size

    // convert if needed
    if (encoding === 'hex' || encoding === 'base64') {
      chunk = Buffer.from(chunk, encoding)
    }

    // output
    next(null, chunk)
  })
}