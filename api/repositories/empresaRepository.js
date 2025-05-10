const db = require('../infra/mysq-connection')
const messages = require('../messages')

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
  GET_EMPRESA_EMAIL_CNPJ,
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
    throw new Error(messages('Empresa').error.getAll)
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
    throw new Error(messages('Empresa').error.getById)
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
    throw new Error(messages('Empresa').error.create)    
  }
}

async function update(id, {
  razao_social,  
  email,
  tipo_pessoa
}) {
  if (!razao_social || !email || !tipo_pessoa) {
    throw new Error('Campos obrigatórios: razao_social, cnpj, email e tipo_pessoa')
  }

  try {
    const [result] = await db.query(UPDATE_EMPRESA, [razao_social, email, tipo_pessoa, id])

    if (result.affectedRows === 0) {
      return {
        success: false,
        message: 'Empresa não encontrada'
      }
    }

    return {
      success: true,
      message: 'Empresa atualizada com sucesso'
    }
  } catch (err) {
    throw new Error(messages('Empresa').error.update)    
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
    throw new Error(messages('Empresa').error.delete)    
  }
}

async function findByEmail(email,cnpj) {
  try {
    let query = GET_EMPRESA_EMAIL

    const params = [email]

    if (cnpj) {
      query = GET_EMPRESA_EMAIL_CNPJ
      params.push(cnpj)
    }    
    
    const [result] = await db.query(query,params)    
        
    return result[0].emails > 0
  } catch (err) {
    throw new Error(messages('Empresa e-mail da empresa').error.findByEmail)    
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
    throw new Error(messages('cnpj da empresa').error.findByCnpj)        
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