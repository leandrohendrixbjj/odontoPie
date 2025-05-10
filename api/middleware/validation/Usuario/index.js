const validateId = require('../validateId')
const validateUsuarioCampos = require('./campos')
// const consultaEmpresaId = require('./id')
const consultaUsuarioEmail = require('./email')
// const consultaEmpresaCNPJ = require('./cnpj')

module.exports = {
  validateId,
  validateUsuarioCampos,
  // validateEmpresaCampos, 
  consultaUsuarioEmail
  // consultaEmpresaCNPJ  
}
