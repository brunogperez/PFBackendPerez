import jwt from 'jsonwebtoken'
import { JWT_PRIVATE_KEY } from '../config/config.js'

export const generateToken = (user, timeExpire = '24h') => {
    try {
        return jwt.sign({ ...user }, JWT_PRIVATE_KEY, { expiresIn: timeExpire })
    } catch (error) {
        req.logger.error()
        throw error
    }
}