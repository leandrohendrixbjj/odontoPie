const validateId = require('../validateId')
const consultaEmpresaId = require('./id')
const validateEmpresaCampos = require('./campos')
const consultaEmpresaEmail = require('./email')
const consultaEmpresaCNPJ = require('./cnpj')

module.exports = {
  validateId,
  consultaEmpresaId,
  validateEmpresaCampos, 
  consultaEmpresaEmail,
  consultaEmpresaCNPJ  
}
