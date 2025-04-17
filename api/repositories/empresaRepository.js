const db = require('../infra/mysq-connection')

const {
  v4: uuidv4
} = require('uuid')

const {
  GET_ALL_EMPRESAS,
  GET_EMPRESA_BY_ID,
  INSERT_EMPRESA,
  UPDATE_EMPRESA,
  DELETE_EMPRESA,
  GET_EMPRESA_EMAIL,
  GET_EMPRESA_CNPJ
} = require('../queries/empresas')

async function getAll() {
  try {
    const [rows] = await db.query(GET_ALL_EMPRESAS)

    return {
      success: true,
      empresa: rows || null
    }
  } catch (err) {
    console.error('Erro ao buscar empresas:', err.message)
    throw new Error('Erro ao buscar empresas')
  }
}

async function getById(id) {
  try {
    const [rows] = await db.query(GET_EMPRESA_BY_ID, [id])

    return {
      success: true,
      empresa: rows[0] || null
    }
  } catch (err) {
    console.error(`Erro ao buscar empresa com ID ${id}:`, err.message)
    throw new Error('Erro ao buscar empresa')
  }
}

async function create({
  razao_social,
  cnpj,
  email,
  tipo_pessoa
}) {
  if (!razao_social || !cnpj) {
    throw new Error('Campos obrigatórios: razao_social,cnpj,tipo_pessoa e email')
  }

  const public_id = uuidv4()

  try {
    const [result] = await db.query(INSERT_EMPRESA, [public_id, razao_social, cnpj, email, tipo_pessoa])

    return {
      success: true,
      message: 'Empresa criada com sucesso',
      empresa: {
        id: result.insertId,
        public_id,
        razao_social,
        cnpj,
        email,
        tipo_pessoa
      }
    }
  } catch (err) {
    console.error('Erro ao criar empresa:', err.message)
    throw new Error('Erro ao criar empresa')
  }
}

async function update(id, {
  razao_social,
  cnpj,
  email,
  tipo_pessoa
}) {
  if (!razao_social || !cnpj || !email || !tipo_pessoa) {
    throw new Error('Campos obrigatórios: razao_social, cnpj, email e tipo_pessoa')
  }

  try {
    const [result] = await db.query(UPDATE_EMPRESA, [razao_social, cnpj, email, tipo_pessoa, id])

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: 'Empresa não encontrada ou dados idênticos'
      }
    }

    return {
      success: true,
      message: 'Empresa atualizada com sucesso'
    }
  } catch (err) {
    console.error(`Erro ao atualizar empresa com ID ${id}:`, err.message)
    throw new Error('Erro ao atualizar empresa')
  }
}

async function softDelete(id) {
  try {
    const [result] = await db.query(DELETE_EMPRESA, [id])

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: 'Empresa não encontrada ou já excluída'
      }
    }

    return {
      success: true,
      message: 'Empresa excluída com sucesso (soft delete)'
    }
  } catch (err) {
    console.error(`Erro ao fazer soft delete da empresa ID ${id}:`, err.message)
    throw new Error('Erro ao excluir empresa')
  }
}

async function findByEmail(email) {
  try {
    const [result] = await db.query(GET_EMPRESA_EMAIL, [email])
    
    if (result[0].emails === 0) {
      return false
    }

    return true
  } catch (err) {
    console.error(`Erro na consuta do e-mail ${email} da empresa:`, err.message)
    throw new Error('Erro na consuta do e-mail da empresa')
  }
}

async function findByCnpj(cnpj) {
  try {
    const [result] = await db.query(GET_EMPRESA_CNPJ, [cnpj])
    
    if (result[0].cnpjs === 0) {
      return false
    }

    return true
  } catch (err) {
    console.error(`Erro na consuta do cnpj ${cnpj} da empresa:`, err.message)
    throw new Error('Erro na consuta do cnpj da empresa')
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  softDelete,
  findByEmail,
  findByCnpj
}