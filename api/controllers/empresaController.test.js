const db = require('../infra/mysq-connection')
const express = require('express')
const request = require('supertest')

const empresaController = require('../controllers/empresasController')
const {
    validateId,
    validateEmpresaCampos,
    consultaEmpresaEmail,
    consultaEmpresaCNPJ
  } = require('../middleware/validation/Empresa/index')

const app = express()
app.use(express.json())
app.get('/empresas', empresaController.getAll)
app.get('/empresas/:id', empresaController.getById)

afterAll(async () => {
  await db.end()
})

describe.skip('🔍 Integração - GET /empresas', () => {
  it('✅ deve retornar empresas do banco real', async () => {
    const res = await request(app).get('/empresas')
    expect(res.body.empresa[0]).toHaveProperty('razao_social')
  })
})

describe.skip('🔍 Integração - GET /empresas/:id', () => {
  it('✅ deve retornar uma empresa existente', async () => {
    const insertedId = 'e6670368-8cd8-43d1-bba4-8b39399fd38b'
    const res = await request(app).get(`/empresas/${insertedId}`)

    expect(res.statusCode).toBe(200)
    expect(res.body.empresa.public_id).toEqual(insertedId)
  })

  it('❌ deve retornar 404 se a empresa não existir', async () => {
    const insertedId = '9999999'
    const res = await request(app).get(`/empresas/${insertedId}`)

    expect(res.statusCode).toBe(404)
    expect(res.body).toEqual({ message: 'Empresa não encontrada' })
  })
})

describe('POST /empresas', () => {
  it.skip('✅ Criar uma nova Empresas', async () => {
    
    const body = {
      razao_social: 'Nova Empresa Teste',
      cnpj: '006',
      email: 'teste6@novaempresa.com.br',
      tipo_pessoa: 'PJ'
    }        
    
    app.post('/empresas', consultaEmpresaEmail, empresaController.create)
    
    const res = await request(app)
      .post('/empresas')
      .send(body)
      console.log(res.error.text)
    expect(res.statusCode).toBe(201)    
  })

  it('✅ Tentativa de Criar uma Empresas já existe ( Email ou CNPJ )', async () => {
    
    const body = {
      razao_social: 'Nova Empresa Teste',
      cnpj: '007',
      email: 'teste6@novaempresa.com.br',
      tipo_pessoa: 'PJ'
    }        
    
    app.post('/empresas', 
        consultaEmpresaEmail, 
        consultaEmpresaCNPJ, 
        empresaController.create)
    
    const res = await request(app)
      .post('/empresas')
      .send(body)
      console.log(res.error.text)    
    expect(res.statusCode).toBe(409)    
  })

  it.skip('❌ Valida Empresa Campos Obrigatórios', async () => {
    
    const body = {      
      cnpj: '007',
      email: 'teste7@novaempresa.com.br',
      tipo_pessoa: 'PJ'
    }        
    
    app.post('/empresas', validateEmpresaCampos, empresaController.create)
    
    const res = await request(app)
      .post('/empresas')
      .send(body)
      expect(res.statusCode).toBe(400)      
  })  
})