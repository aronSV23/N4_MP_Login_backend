import { pool } from '../config/db.js'

const profileDataByColum = async (columna, valor) => {
  const [usuario] = await pool.execute(`SELECT * FROM users WHERE ${columna} = ?`, [valor])

  return usuario?.length === 0 ? undefined : usuario[0]
}

const createUser = async (user) => {
  const query = 'INSERT INTO users SET ?'
  const [result] = await pool.query(query, user)

  // Corroborar que se ha insertado el nuevo registro
  if (result.affectedRows === 1) {
    // Traer los datos del usuario registrado para enviarlo
    const newUser = await profileDataByColum('id', result.insertId)
    return newUser
  }

  return undefined
}

const updateUser = async (id, updatedFields) => {
  const query = 'UPDATE users SET ? WHERE id = ?'
  const [result] = await pool.query(query, [updatedFields, id])
  if (result.affectedRows <= 0) {
    return undefined
  }
  const userUpdateData = await profileDataByColum('id', id)
  return userUpdateData
}

export default { createUser, updateUser, profileDataByColum }
