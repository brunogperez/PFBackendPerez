/* import UsersjsonDTO from '../dto/users.dto.js' */
import Mail from '../modules/mail.module.js'
import { cartsService, usersService } from '../services/index.js'
import { generateToken } from '../utils/jsonWebToken.js'
import { createHash, isValidPassword } from '../utils/bcryptPassword.js'


const mail = new Mail()



export const sessionLogin = async (req, res) => {
  try {

    const { email, password } = req.body

    const user = await usersService.getUserByEmail(email)
    if (!user) return res.status(400).json('El email no existe')

    const validPassword = isValidPassword(password, user.password)
    if (!validPassword) return res.status(400).json('Password incorrecto')

    const { _id, first_name, last_name, role } = user
    const token = generateToken({ _id, first_name, last_name, email, role })

    return res.json({ user, token })

  } catch (e) {
    req.logger.error('Error: ' + e)
    return res.status(500).json('Server Error')
  }
}

export const sessionRegister = async (req, res) => {
  try {

    req.body.password = createHash(req.body.password)


    const cart = await cartsService.addCart()
    if (!cart) return res.status(500).json({ ok: false, msg: 'No se pudo crear el cart' })

    req.body.cart_id = cart._id

    const user = await usersService.createUser(req.body)

    const { _id, first_name, last_name, email, role } = user

    const token = generateToken({ _id, first_name, last_name, email, role })

    return res.json({ user, token })

  }
  catch (e) {

    req.logger.error('Error: ' + e)
    return res.status(500).json('Server Error')

  }
}

export const revalidateToken = async (req, res) => {

  const { _id, first_name, last_name, email, role } = req

  const user = await usersService.getUserByEmail(email)

  const token = generateToken({ _id, first_name, last_name, email, role })

  return res.json({ ok: true, user, token })

}