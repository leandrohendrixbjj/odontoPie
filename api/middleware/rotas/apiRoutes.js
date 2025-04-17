const express = require('express')
const empresasRoutes = require('../../routes/empresas')
const healthCheckRoute = require('../config/healthCheck')

const router = express.Router()

// Rotas de saúde
router.use('/api', healthCheckRoute)

// Rotas principais da API
router.use('/api/empresas', empresasRoutes)

module.exports = router
