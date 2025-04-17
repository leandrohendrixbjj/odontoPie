const empresaRepo = require('../../../repositories/empresaRepository') 

module.exports = async (req, res, next) => {
  try {
    const { email } = req.body

    const emailExistente = await empresaRepo.findByEmail(email)

    if (emailExistente) {
      return res.status(409).json({ error: `E-mail: ${email} já possui cadastro` });
    }
    
    next() 
  } catch (err) {
    console.error('Erro na consulta do email (Middleware):', err)
    res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}
