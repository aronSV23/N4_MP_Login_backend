import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config/config.js'

export const validarToken = (req, res, next) => {
  try {
    const { authorization } = req.headers

    if (!authorization) return res.status(403).json({ message: 'Envía un token' })

    const verified = jwt.verify(authorization, SECRET_KEY)

    req.user = verified

    next()
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(400).json({ message: 'Token inválido' })
    }

    return res.status(500).json({ message: 'Error interno' })
  }
}
