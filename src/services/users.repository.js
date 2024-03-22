export default class UsersRepository {
  constructor(dao) {
    this.dao = dao
  }

  getUserById = async (id) => await this.dao.getUserById(id)


  getUserByEmail = async (email) =>  await this.dao.getUserByEmail(email)


  createUser = async (user) => await this.dao.createUser(user)


  changeUserPassword = async (user, password) =>  await this.dao.updateUser(user, password)


  switchRole = async (user) => {
    const role = user?.role != "admin" ? (user?.role == "user" ? "premium" : "user") : "admin"
    const result = await this.dao.updateUser(user, role, "role")
    return result
  }
}
