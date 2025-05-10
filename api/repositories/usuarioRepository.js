const db = require('../infra/mysq-connection')
const messages = require('../messages')

const {
  v4: uuidv4
} = require('uuid')

const {
  GET_ALL_USUARIOS,
  GET_USUARIOS_BY_ID
  // INSERT_EMPRESA,
  // UPDATE_EMPRESA,
  // DELETE_EMPRESA,
  // GET_EMPRESA_EMAIL,  
  // GET_EMPRESA_EMAIL_CNPJ,
  // GET_EMPRESA_CNPJ
} = require('../queries/usuarios')

async function getAll() {
  try {
    const [rows] = await db.query(GET_ALL_USUARIOS)

    return {
      success: true,
      empresa: rows || null
    }
  } catch (err) {
    console.log(err)
    throw new Error(messages('Usuario').error.getAll)
  }
}

async function getById(id) {
  try {
    const [rows] = await db.query(GET_USUARIOS_BY_ID, [id])

    return {
      success: true,
      empresa: rows[0] || null
    }
  } catch (err) {
    throw new Error(messages('Usuario').error.getById)
  }
}

// async function create({
//   razao_social,
//   cnpj,
//   email,
//   tipo_pessoa
// }) {
//   if (!razao_social || !cnpj) {
//     throw new Error('Campos obrigatórios: razao_social,cnpj,tipo_pessoa e email')
//   }

//   const public_id = uuidv4()

//   try {
//     const [result] = await db.query(INSERT_EMPRESA, [public_id, razao_social, cnpj, email, tipo_pessoa])

//     return {
//       success: true,
//       message: 'Empresa criada com sucesso',
//       empresa: {
//         id: result.insertId,
//         public_id,
//         razao_social,
//         cnpj,
//         email,
//         tipo_pessoa
//       }
//     }
//   } catch (err) {
//     console.error('Erro ao criar empresa:', err.message)
//     throw new Error('Erro ao criar empresa')
//   }
// }

// async function update(id, {
//   razao_social,  
//   email,
//   tipo_pessoa
// }) {
//   if (!razao_social || !email || !tipo_pessoa) {
//     throw new Error('Campos obrigatórios: razao_social, cnpj, email e tipo_pessoa')
//   }

//   try {
//     const [result] = await db.query(UPDATE_EMPRESA, [razao_social, email, tipo_pessoa, id])

//     if (result.affectedRows === 0) {
//       return {
//         success: false,
//         message: 'Empresa não encontrada'
//       }
//     }

//     return {
//       success: true,
//       message: 'Empresa atualizada com sucesso'
//     }
//   } catch (err) {
//     console.error(`Erro ao atualizar empresa com ID ${id}:`, err.message)
//     throw new Error('Erro ao atualizar empresa')
//   }
// }

// async function softDelete(id) {
//   try {
//     const [result] = await db.query(DELETE_EMPRESA, [id])

//     if (result.affectedRows === 0) {
//       return {
//         success: false,
//         message: 'Empresa não encontrada ou já excluída'
//       }
//     }

//     return {
//       success: true,
//       message: 'Empresa excluída com sucesso (soft delete)'
//     }
//   } catch (err) {
//     console.error(`Erro ao fazer soft delete da empresa ID ${id}:`, err.message)
//     throw new Error('Erro ao excluir empresa')
//   }
// }

// async function findByEmail(email,cnpj) {
//   try {
//     let query = GET_EMPRESA_EMAIL

//     const params = [email]

//     if (cnpj) {
//       query = GET_EMPRESA_EMAIL_CNPJ
//       params.push(cnpj)
//     }    
    
//     const [result] = await db.query(query,params)    
        
//     return result[0].emails > 0
//   } catch (err) {
//     console.error(`Erro na consuta do e-mail ${email} da empresa:`, err.message)
//     throw new Error('Erro na consuta do e-mail da empresa')
//   }
// }

// async function findByCnpj(cnpj) {
//   try {
//     const [result] = await db.query(GET_EMPRESA_CNPJ, [cnpj])
    
//     if (result[0].cnpjs === 0) {
//       return false
//     }

//     return true
//   } catch (err) {
//     console.error(`Erro na consuta do cnpj ${cnpj} da empresa:`, err.message)
//     throw new Error('Erro na consuta do cnpj da empresa')
//   }
// }

module.exports = {
  getAll,
  getById
  // create,
  // update,
  // softDelete,
  // findByEmail,
  // findByCnpj
}