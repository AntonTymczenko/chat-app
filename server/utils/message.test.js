const expect = require('expect')

const {generateMessage} = require('./message')

describe('generateMessage', ()=> {
  it('should generate the correct message object', ()=> {
    const text = 'some new generated message',
      from = 'John Doe'
    const resp = generateMessage(from, text)

    expect(resp.createdAt).toBeA('number')
    expect(resp).toInclude({text, from})
  })
})
