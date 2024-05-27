import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import fs from 'node:fs/promises'
import path from 'node:path'
import { SECRET_KEY } from '../config/config.js'
import userModel from '../models/user.model.js'

// Crear un nuevo usuario
export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: 'Faltan datos para el registro' })

    // Validación la contraseña
    const contraseñaValida = ((password.length >= 8) && (/[A-Z]/.test(password)))
    if (!contraseñaValida) return res.status(400).json({ message: 'La contraseña debe tener mayuscula, minusculas y 8 caracteres como mínimo.' })
    const hashedPassword = await bcrypt.hash(password, 10)

    // Validación el email
    if (!email?.includes('@')) return res.status(400).json({ message: 'Invalid email.' })
    const existingUser = await userModel.profileDataByColum('email', email)
    if (existingUser) return res.status(400).json({ message: 'El correo ya está en uso' })

    const newUserDataToAdd = { email, password: hashedPassword }

    const newUser = await userModel.createUser(newUserDataToAdd)

    if (!newUser) return res.status(500).json({ message: 'No se pudo crear el usuario' })

    const token = jwt.sign({ id: newUser.id }, SECRET_KEY, { expiresIn: '1h' })

    delete newUser.password
    return res.status(201).json({ message: 'Usuario registrado con éxito', token, data: newUser })
  } catch (error) {
    // Corroborar si el error se debe a una entrada duplicada (correo)
    if (error?.errno === 1062) return res.status(400).json({ message: 'Credenciales duplicadas' })

    return res.status(500).json({ message: 'Error al registrar usuario', error })
  }
}

// Iniciar sesión del usuario
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) return res.status(400).json({ message: 'Faltan datos para el inciar sesión' })

    // Corroborar que el usuario exista en la base de datos
    const usuario = await userModel.profileDataByColum('email', email)

    if (!usuario) return res.status(400).json({ message: 'Credenciales inválidas' })

    // Comparar la contraseña encripatada con la entrada del usuario en esta petición
    const isValidPassword = await bcrypt.compare(password, usuario.password)

    if (!isValidPassword) return res.status(400).json({ message: 'Credenciales incorrectas' })

    const token = jwt.sign({ id: usuario.id }, SECRET_KEY, { expiresIn: '1h' })

    delete usuario.password
    res.json({ token, data: usuario })
  } catch (error) {
    res.status(500).json({ message: 'Error al iniciar sesión', error })
  }
}

// Obtener la informacion del usuario
export const getProfile = async (req, res) => {
  try {
    const userId = req.user.id

    const user = await userModel.profileDataByColum('id', userId)

    if (user.length === 0) return res.status(404).json({ message: 'User not found' })

    delete user.password

    res.json(user)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
}

// Obtener la ruta de la imagen de perfil
export const getProfilePicture = async (req, res) => {
  try {
    const { filename } = req.params
    const absolutePath = path.resolve(path.normalize(`./uploads/${filename}`))

    await fs.access(absolutePath, fs.constants.F_OK)
    return res.sendFile(absolutePath)
  } catch (error) {
    return res.status(404).json({ message: 'Imagen no encontrada' })
  }
}

// Actualizar datos del usuario
export const updateProfile = async (req, res) => {
  try {
    const { name, bio, phone, email, password } = req.body
    const userId = req.user.id

    const updatedFields = {}
    const prevUserData = await userModel.profileDataByColum('id', userId)

    // Validación de los datos
    if (password) {
      const contraseñaValida = ((password.length >= 8) && (/[A-Z]/.test(password)))
      if (!contraseñaValida) {
        if (req.file) await fs.unlink(path.normalize(`uploads/${req.file.filename}`))
        return res.status(400).json({ message: 'La contraseña debe tener mayuscula, minusculas y 8 caracteres como mínimo.' })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      updatedFields.password = hashedPassword
    }

    if (email) {
      if (!email?.includes('@')) {
        if (req.file) await fs.unlink(path.normalize(`uploads/${req.file.filename}`))
        return res.status(400).json({ message: 'Invalid email.' })
      }
      const existingUser = await userModel.profileDataByColum('email', email)
      if (existingUser && prevUserData.email !== email) {
        if (req.file) await fs.unlink(path.normalize(`uploads/${req.file.filename}`))
        return res.status(400).json({ message: 'El correo ya está en uso' })
      }
      updatedFields.email = email
    }

    if (req.file) {
      updatedFields.profile_picture = req.file.filename
    }

    if (name) updatedFields.name = name
    if (bio) updatedFields.bio = bio
    if (phone) updatedFields.phone = phone

    const result = await userModel.updateUser(userId, updatedFields)

    delete result.password

    if (result) {
      if (prevUserData.profile_picture !== 'defaultProfilePicture.jpg') {
        await fs.unlink(path.normalize(`uploads/${prevUserData.profile_picture}`))
      }
      return res.status(200).json({ message: 'Usuario actualizado exitosamente', data: result })
    }

    if (req.file) await fs.unlink(path.normalize(`uploads/${req.file.filename}`))
    return res.status(404).json({ message: 'Error al modificar el registro' })
  } catch (error) {
    if (req.file) await fs.unlink(path.normalize(`uploads/${req.file.filename}`))
    res.status(500).json({ message: 'Error al actualizar usuario', error })
  }
}
