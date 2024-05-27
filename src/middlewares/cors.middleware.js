import { corsPermitidos } from '../config/config.js'

export const corsValidation = (req, res, next) => {
  const { origin } = req.headers

  // Permitir acceso siempre desde localhost
  if (!origin || corsPermitidos.includes(origin) || origin.includes('localhost')) {
    res.setHeader('Access-Control-Allow-Origin', origin || '*')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS')
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200)
    }
    next()
  } else {
    return res.status(403).json({ message: 'Error de CORS' })
  }
}
