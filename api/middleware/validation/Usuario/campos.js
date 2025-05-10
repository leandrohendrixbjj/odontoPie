const { check, validationResult } = require('express-validator')

module.exports = async (req, res, next) => {
  await Promise.all([
    check('nome')
      .notEmpty().withMessage('Nome é obrigatório')
      .isLength({ min: 3 }).withMessage('Nome deve ter pelo menos 2 caracteres')
      .run(req),
    
    check('email')
      .notEmpty().withMessage('E-mail é obrigatório')
      .isEmail().withMessage('E-mail inválido')
      .run(req),
  ]);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
};
