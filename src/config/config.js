import { config } from 'dotenv'

config()

export const DB_HOST = process.env.DB_HOST || 'localhost'
export const DB_USERNAME = process.env.DB_USERNAME || 'root'
export const DB_PASSWORD = process.env.DB_PASSWORD || ''
export const DB_DATABASE = process.env.DB_DATABASE || 'n4_mp'
export const DB_PORT = process.env.DB_PORT || 3306
export const PORT = process.env.PORT || 3000
export const SECRET_KEY = process.env.SECRET_KEY
export const corsPermitidos = ['http://localhost:5173', 'thunder client', 'http://localhost:5173/login', 'http://localhost:5173/register', 'http://localhost:3000']
