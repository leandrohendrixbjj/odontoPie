const empresaRepo = require('../../../repositories/empresaRepository') 

module.exports = async (req, res, next) => {
  try {
    const { cnpj } = req.body

    const cnpjExistente = await empresaRepo.findByCnpj(cnpj)

    if (cnpjExistente) {
      return res.status(409).json({ error: `CNPJ: ${cnpj} já possui cadastro` });
    }
    
    next() 
  } catch (err) {
    console.error('Erro na consulta do cnpj (Middleware):', err)
    res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}
