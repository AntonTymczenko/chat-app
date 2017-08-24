class Users {
  constructor () {
    this.users = []
  }
  addUser (id, name, room) {
    const user = {id, name, room}
    this.users.push(user)
    return user
  }
  removeUser(id) {
    const user = this.getUser(id)
    if (user) {
      this.users = this.users.filter(u => u.id !== user.id)
      /*
      for (let i in this.users) {
        if (this.users[i] === user) {
          this.users.splice(i, 1)
          break
        }
      }
      */
    }
    return user
  }
  getUser(id) {
    return this.users.filter(u => u.id === id)[0]
  }
  getUserList(room) {
    let users = this.users.filter(u => u.room === room)
    return users.map(u => u.name)
  }
}

module.exports = {Users}
