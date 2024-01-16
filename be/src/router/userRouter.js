import {login, register, checkToken} from '../controllers/userController.js';
import middlewareValidation from '../controllers/middleware.js'
import express from 'express'

const router = express.Router()

router.post('/auth/register', register)
router.post('/auth/login', login)
router.post('/auth/user-valid', middlewareValidation, checkToken)

export default router
