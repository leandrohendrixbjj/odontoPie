const validateId = require('../validateId')
const validateEmpresaCampos = require('./campos')
const consultaEmpresaEmail = require('./email')
const consultaEmpresaCNPJ = require('./cnpj')

module.exports = {
  validateId,
  validateEmpresaCampos, 
  consultaEmpresaEmail,
  consultaEmpresaCNPJ  
}
