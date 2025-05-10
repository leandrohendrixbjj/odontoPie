const empresaRepo = require('../repositories/empresaRepository')

exports.getAll = async (req, res) => {
  try {
    const data = await empresaRepo.getAll()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const data = await empresaRepo.getById(req.params.id)    
    if (!data.empresa) {
      return res.status(404).json({ message: 'Empresa não encontrada' })
    }
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { razao_social, cnpj, email, tipo_pessoa } = req.body
    const data = await empresaRepo.create({ razao_social, cnpj, email, tipo_pessoa })
    res.status(201).json(data)
  } catch (err) {
    console.log('err',err.message)       
    res.status(500).json({ error: err.message })
  }
}

exports.edit = async (req, res) => {
  try {
    const { razao_social, email, tipo_pessoa } = req.body
    const data = await empresaRepo.update(req.params.id, {
      razao_social,      
      email,
      tipo_pessoa
    })
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.delete = async (req, res) => {
  try {
    await empresaRepo.softDelete(req.params.id)
    res.status(200)
    .json({ status: true, message: 'Empresa excluída' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}