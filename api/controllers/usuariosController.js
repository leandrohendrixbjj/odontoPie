const usuarioRepository = require('../repositories/usuarioRepository')

exports.getAll = async (req, res) => {
  try {
    const data = await usuarioRepository.getAll()
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.getById = async (req, res) => {
  try {
    const data = await usuarioRepository.getById(req.params.id)    
    if (!data.empresa) {
      return res.status(404).json({ message: 'Usuário não encontrada' })
    }
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

exports.create = async (req, res) => {
  try {
    const { nome, email, empresaId, perfilId } = req.body
    const data = await usuarioRepository.create({ nome, email, empresaId, perfilId })
    res.status(201).json(data)
  } catch (err) {
    console.log('err',err.message)       
    res.status(500).json({ error: err.message })
  }
}

// exports.edit = async (req, res) => {
//   try {
//     const { razao_social, email, tipo_pessoa } = req.body
//     const data = await empresaRepo.update(req.params.id, {
//       razao_social,      
//       email,
//       tipo_pessoa
//     })
//     res.status(200).json(data)
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }

// exports.delete = async (req, res) => {
//   try {
//     await empresaRepo.softDelete(req.params.id)
//     res.status(200)
//     .json({ status: true, message: 'Empresa excluída' })
//   } catch (err) {
//     res.status(500).json({ error: err.message })
//   }
// }