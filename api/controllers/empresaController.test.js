const db = require('../infra/mysq-connection')
const express = require('express')
const request = require('supertest')

const empresaController = require('../controllers/empresasController')
const {
    validateId,
    consultaEmpresaId,
    validateEmpresaCampos,
    consultaEmpresaEmail,
    consultaEmpresaCNPJ
  } = require('../middleware/validation/Empresa/index')

const baseBody = {     
  razao_social:"Pedro", 
  cnpj: '12333444000156',
  email: '1pedro@novaempresa.com.br',
  tipo_pessoa: 'PJ'
}        
      
beforeAll(() => {
  app = express();
  app.use(express.json());
  app.get('/empresas', empresaController.getAll)
  app.get('/empresas/:id', empresaController.getById)
  app.post('/empresas/valida', validateEmpresaCampos, empresaController.create)
  app.put('/empresas/:id', validateId, validateEmpresaCampos, consultaEmpresaEmail, empresaController.edit) 
  app.delete('/empresas/:id', validateId, consultaEmpresaId, empresaController.delete) 
})

afterAll(async () => {
  await db.end()
})

describe.skip('🔍 GET :: /empresas', () => {
  it.skip('✅', async () => {
    const res = await request(app).get('/empresas')    
    expect(res.body.empresa[0]).toHaveProperty('razao_social')
  })
})

describe.skip('🔍 GET :: /empresas/:id', () => {
  it.skip('✅ CONSULTA UMA EMPRESA', async () => {
    const insertedId = 'e6670368-8cd8-43d1-bba4-8b39399fd38b'
    const res = await request(app).get(`/empresas/${insertedId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.empresa.public_id).toEqual(insertedId)
  })

  it.skip('❌ CONSULTA UMA EMPRESA SEM CADASTRO', async () => {
    const insertedId = '9999999'
    const res = await request(app).get(`/empresas/${insertedId}`)

    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({ message: 'Empresa não encontrada' })
  })
})

describe.skip('POST :: /empresas', () => {
  it('❌ CRIAR COM DADOS INVÁLIDOS', async () => {   
    
    const body = {
      ...baseBody,
      razao_social: null,
      cnpj: '007',
    } 
       
    const res = await request(app)
      .post('/empresas/valida')
      .send(body)  
      expect(res.body.errors[0].msg).toBeTruthy()

  })  

  it('❌ CRIAR COM DADOS EXISTEM Email ou CNPJ', async () => {
    
    const body = {
      ...baseBody,
      cnpj: '007',
      email: 'teste6@novaempresa.com.br',      
    }        
    
    app.post('/empresas', 
        consultaEmpresaEmail, 
        consultaEmpresaCNPJ, 
        empresaController.create)
    
    const res = await request(app)
      .post('/empresas')
      .send(body)      
    expect(res.statusCode).toBe(409)    
  })

  it.skip('✅ CRIAR', async () => {
    
    const body = {
      razao_social:"Pedro",
      cnpj: "13444555000167",
      email: "01pedro@gmail.com",
      tipo_pessoa: "PF"
    }        
    
    app.post('/empresas', empresaController.create)  

    const res = await request(app)
      .post('/empresas')
      .send(body)
      console.log(res.error.text)
    expect(res.statusCode).toBe(201)    
  })
})

describe('DELETE :: /empresas/:id', () => {
  it.skip('❌ REMOVER COM ID INVÁLIDO', async () => {
    const publicId = '9999999'
    
    const res = await request(app)
      .delete(`/empresas/${publicId}`)      
    
    expect(res.body.error).toContain('ID inválido')

  })

  it.skip('❌ REMOVER ID INEXISTENTE', async () => {
    const publicId = '3816a937-7260-46e9-9c92-2c8c6a06ee6a'
    
    const res = await request(app)
      .delete(`/empresas/${publicId}`)      
    
    expect(res.body.error).toContain('não possui cadastro');


  })
  
  it.skip('✅ REMOVER', async () => {
    const publicId = 'd16d48af-d322-4783-a537-2f56d4ba0a01'

    const res = await request(app)
    .delete(`/empresas/${publicId}`)          
   
    expect(res.statusCode).toBe(200)      
  })
})


