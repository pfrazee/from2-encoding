const tape = require('tape')
const { Writable } = require('stream')

const from2Encoding = require('./')

function drain (done) {
  var chunks = []
  var s = new Writable({
    write(chunk, encoding, cb) {
      chunks.push(chunk)
      cb()
    }
  })
  s.on('finish', () => {
    done(Buffer.concat(chunks))
  })
  return s
}

tape('should throw if no encoding is given', t => {
  t.throws(from2Encoding, 'hello world')
  t.end()
})

tape('should create a stream from a string', t => {
  t.plan(2)
  from2Encoding('hello world', 'utf8').pipe(drain(res => {
    t.ok(Buffer.isBuffer(res))
    t.equal(res.toString(), 'hello world')
  }))
})

tape('should create a stream from base64', t => {
  t.plan(2)
  from2Encoding('aGVsbG8gd29ybGQ=', 'base64').pipe(drain(res => {
    t.ok(Buffer.isBuffer(res))
    t.equal(res.toString(), 'hello world')
  }))
})

tape('should create a stream from hex', t => {
  t.plan(2)
  from2Encoding('deadbeef', 'hex').pipe(drain(res => {
    t.ok(Buffer.isBuffer(res))
    t.equal(res.toString('hex'), 'deadbeef')
  }))
})

tape('should create a stream from binary', t => {
  t.plan(2)
  from2Encoding(new Buffer('deadbeef', 'hex'), 'binary').pipe(drain(res => {
    t.ok(Buffer.isBuffer(res))
    t.equal(res.toString('hex'), 'deadbeef')
  }))
})

