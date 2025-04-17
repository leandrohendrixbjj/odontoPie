const express = require('express')
const router = express.Router()

const empresasController = require('../controllers/empresasController')
const {
  validateId,
  validateEmpresaCampos,
  consultaEmpresaEmail,
  consultaEmpresaCNPJ
} = require('../middleware/validation/Empresa/index')

// 🔍 Rotas de consulta
router.get('/', empresasController.getAll)
router.get('/:id', validateId, empresasController.getById)

// ➕ Rota de criação
router.post(
  '/',
  validateEmpresaCampos,
  consultaEmpresaEmail,
  consultaEmpresaCNPJ,
  empresasController.create
)

// ✏️ Rota de edição
router.put(
  '/:id',
  validateId,
  validateEmpresaCampos,
  consultaEmpresaEmail,
  consultaEmpresaCNPJ,
  empresasController.edit
)

// ❌ Rota de exclusão
router.delete('/:id', validateId, empresasController.delete)

module.exports = router
