const { check, validationResult } = require('express-validator')

module.exports = async (req, res, next) => {
  await Promise.all([
    check('razao_social').notEmpty().withMessage('Razão social é obrigatória').run(req),
    check('cnpj')
      .notEmpty().withMessage('CNPJ é obrigatório')
      .isLength({ min: 14, max: 14 }).withMessage('CNPJ deve ter 14 caracteres')
      .run(req),
    check('email')
      .notEmpty().withMessage('E-mail é obrigatório')
      .isEmail().withMessage('E-mail inválido')
      .run(req),
    check('tipo_pessoa')
      .isIn(['PF', 'PJ'])
      .withMessage('Tipo de pessoa deve ser "fisica" ou "juridica"')
      .run(req),
  ])

  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}
