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

/* export const githubCallback = async (req, res) => {
  try {
    if (!req.user) return res.status(400).json({ status: 'error', payload: 'Invalid github' })
    return res.cookie('jwtCookie', req?.user?.token).redirect('/products')
  }
  catch (e) {
    req.logger.error('Error: ' + e)
    return res.status(500).json({ message: 'Server Error' })
  }
}

export const sessionCurrent = (req, res) => {
  const { user } = req.user
  const userTojson = new UsersjsonDTO(user)
  res.json({ status: 'success', payload: userTojson })
}

export const sessionLogout = (req, res) => {
  try {
    res.cookie('jwtCookie', '').redirect('/login')
  }
  catch (e) {
    req.logger.error('Error: ' + e)
    return res.status(500).json({ message: 'Server Error' })
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { password, email } = req?.body

    const user = await usersService.getUserByEmail(email)
    if (!user) return res.status(400).json({ payload: 'Invalid user' })

    const validPassword = isValidPassword(user, password)

    if (validPassword) return res.status(400).json({ payload: 'la contraseña es la misma' })

    const result = await usersService.changeUserPassword(user, createHash(password))

    res.json({ result })
  }
  catch (e) {
    req.logger.error('Error: ' + e)
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export const changePasswordMail = async (req, res) => {
  try {
    const { email } = req?.body

    const user = await usersService.getUserByEmail(email)
    if (!user) return res.status(400).json({ status: 'error', payload: `User doesn't exists` })

    const token = generateToken(user, '1h')

    const url = `http://localhost:8080/reset-password?token=${token}`

    await mail.json(email, 'Cambiar contraseña', `${url}`)

    res.json({ status: 'success', payload: { url, email } })
  }
  catch (e) {
    req.logger.error('Error: ' + e + req)
    return res.status(500).json({ message: 'Server Error' })
  }
}

export const switchRole = async (req, res) => {
  try {
    const { uid } = req?.params

    const user = await usersService.getUserById(uid)
    if (!user) return res.status(400).json({ status: 'error', payload: `User doesn't exists` })

    const result = await usersService.switchRole(user)

    res.json({ status: 'success', payload: result })
  }
  catch (e) {
    req.logger.error('Error: ' + e + req)
    return res.status(500).json({ message: 'Server Error' })
  }
} */