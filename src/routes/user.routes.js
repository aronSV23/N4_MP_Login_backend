import { Router } from 'express'
import { getProfile, getProfilePicture, login, register, updateProfile } from '../controllers/user.controller.js'
import { handleError, uploadImage } from '../middlewares/multer.middleware.js'
import { validarToken } from '../middlewares/validateJWT.middleware.js'

const router = Router()

router.post('/login', login)
router.post('/register', register)
router.get('/profile', validarToken, getProfile)
router.get('/profilePicture/:filename', getProfilePicture)
router.patch('/update', validarToken, uploadImage.single('profilePicture'), handleError, updateProfile)

export default router
