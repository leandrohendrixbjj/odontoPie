const empresaRepo = require('../../../repositories/empresaRepository') 

module.exports = async (req, res, next) => {
  try {
    const { id } = req.params

    const idExistente = await empresaRepo.getById(id)
    
    if (!idExistente.empresa) {
      return res.status(409).json({ error: `Empresa: não possui cadastro` });
    }
    
    next() 
  } catch (err) {
    console.error('Erro na consulta do ID (Middleware):', err)
    res.status(500).json({ error: 'Erro interno do servidor.' })
  }
}
