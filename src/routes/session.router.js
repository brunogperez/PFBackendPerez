import { Router } from 'express'
import {
  revalidateToken,
  sessionLogin,
  sessionRegister,
} from '../controllers/session.controller.js'

import { check } from 'express-validator'
import { validarJWT, validateFields } from '../middlewares/auth.middlewares.js'
import { existEmail } from '../utils/dbValidator.js'

const router = Router()

router.post('/login', [

  check('email', 'El email es obligatorio').not().isEmpty(),
  check('email', 'El email tiene el formato incorrecto').isEmail(),
  check('password', 'El password es obligatorio').not().isEmpty(),
  check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
  validateFields
], sessionLogin)

router.post('/register',[
  check('first_name', 'El nombre es obligatorio').not().isEmpty(),
  check('last_name', 'El apellido es obligatorio').not().isEmpty(),
  check('email', 'El email es obligatorio').not().isEmpty(),
  check('email', 'El email tiene el formato incorrecto').isEmail(),
  check('email').custom(existEmail),
  check('password', 'El password es obligatorio').not().isEmpty(),
  check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
  validateFields
], sessionRegister)

router.get('/', validarJWT, revalidateToken)

export default router