const express = require('express')
const empresasRoutes = require('../../routes/empresas')
const usuariosRoutes = require('../../routes/usuarios')
const healthCheckRoute = require('../config/healthCheck')

const router = express.Router()

// Rotas de saúde
router.use('/api', healthCheckRoute)

// EMPRESAS
router.use('/api/empresas', empresasRoutes)

// USUARIOS
router.use('/api/usuarios', usuariosRoutes)

module.exports = router
