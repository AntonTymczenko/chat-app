const expect = require('expect')

const {generateMessage,
  generateLocationMessage} = require('./message')

describe('generateMessage', ()=> {
  it('should generate the correct message object', ()=> {
    const text = 'some new generated message',
      from = 'John Doe'
    const resp = generateMessage(from, text)

    expect(resp.createdAt).toBeA('number')
    expect(resp).toInclude({text, from})
  })
})

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const resp = generateLocationMessage('User1', 1.001, 2.002)
    expect(resp.createdAt).toBeA('number')
    expect(resp.from).toBe('User1')
    expect(resp.url)
     .toBe('https://www.google.com/maps?q=1.001,2.002')
  })
})
