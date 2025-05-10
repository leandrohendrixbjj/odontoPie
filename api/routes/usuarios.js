const express = require('express')
const router = express.Router()

const usuariosController = require('../controllers/usuariosController')
const validateId =  require('../middleware/validation/validateId')

const {
    validateUsuarioCampos,
    consultaUsuarioEmail  
} = require('../middleware/validation/Usuario/index')

// 🔍 Rotas de consulta
router.get('/', usuariosController.getAll)
router.get('/:id', validateId, usuariosController.getById)

// ➕ Rota de criação
router.post(
  '/',
  validateUsuarioCampos,
  consultaUsuarioEmail,
  usuariosController.create
)

// ✏️ Rota de edição
// router.put(
//   '/:id',
//   validateId,
//   validateEmpresaCampos,
//   consultaEmpresaEmail,  
//   empresasController.edit
// )

// ❌ Rota de exclusão
// router.delete('/:id', validateId, 
//   consultaEmpresaId,
//   empresasController.delete)

module.exports = router
