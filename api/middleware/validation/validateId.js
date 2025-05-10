const validateId = (req, res, next) => {
    const { id } = req.params
    // Expressão regular para validar UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  
    if (!id || !uuidRegex.test(id)) {
      return res.status(400).json({ error: 'ID inválido.' })
    }
    next()
  }  
  module.exports = validateId
  