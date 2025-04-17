const { check } = require('express-validator')

// Middleware para validação dos dados da empresa
const 
validateEmpresaCampos = [
  check('razao_social').notEmpty().withMessage('Razão social é obrigatória'),
  check('cnpj').notEmpty().isLength({ min: 14, max: 14 }).withMessage('CNPJ deve ter 14 caracteres'),
  check('email').notEmpty().isEmail().withMessage('E-mail inválido'),
  check('tipo_pessoa').isIn(['fisica', 'juridica']).withMessage('Tipo de pessoa deve ser "fisica" ou "juridica"')
]

module.exports = validateEmpresaCampos
