const {Users} = require('./users'),
  expect = require('expect')

describe('Users', () => {
  let users

  beforeEach(()=>{
    users = new Users()
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'nerds'
    }, {
      id: '2',
      name: 'Jen',
      room: 'nerds'
    }, {
      id: '3',
      name: 'Jodie',
      room: 'cat luvrs'
    }]
  })

  it('should add new user', () => {
    let users = new Users()
    let user = {
      id: '123',
      name: 'John',
      room: 'cat luvrs'
    }
    let resUser = users.addUser(user.id, user.name, user.room)
    expect(users.users).toEqual([user])
    expect(resUser).toEqual(user)
  })

  it('should return names for "nerds" room', () => {
    let userList = users.getUserList('nerds')
    expect(userList).toEqual(['Mike', 'Jen'])
  })
  it('should return names for "cat luvrs" room', () => {
    let userList = users.getUserList('cat luvrs')
    expect(userList).toEqual(['Jodie'])
  })
  it('should retrun a user by id', () => {
    let resUser = users.getUser('2')
    expect(resUser).toEqual(users.users[1])
    expect(resUser.id).toBe('2')
  })
  it('should not find a user by invalid id', () => {
    let resUser = users.getUser('asddsf')
    expect(resUser).toNotExist()
  })
  it('should remove a user by id', () => {
    let resUser = users.removeUser('1')
    expect(resUser.id).toEqual('1')
    expect(users.users.length).toBe(2)
  })
  it('should not remove user with invalid ID', () => {
    let resUser = users.removeUser('asdfasf')
    expect(resUser).toNotExist()
    expect(users.users.length).toBe(3)
  })
})
