const empresaRepo = require('../../../repositories/empresaRepository') 

module.exports = async (req, res, next) => {
  try {
    const { method } = req
    const { email,cnpj } = req.body

    const emailExistente = await empresaRepo.findByEmail(email, method === 'PUT' ? cnpj : undefined)
    
    const erroEmail = method === 'POST'
      ? `E-mail: ${email} já possui cadastro`
      : `E-mail: ${email} já está sendo usado por outro cadastro`

    if (emailExistente) {
      return res.status(409).json({ error: erroEmail })
    }  
    
    next() 
  } catch (err) {
    console.error('Erro na consulta do email (Middleware):', err)
    res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}
