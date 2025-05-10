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

describe.skip('PUT :: /empresas/:id', () => {
  it.skip('❌ EDITAR COM ID INVÁLIDO', async () => {
    const publicId = '9999999'
    const body = {
      ...baseBody,      
    }
    
    const res = await request(app)
      .put(`/empresas/${publicId}`)
      .send(body)      
    
    expect(res.body.error).toContain('ID inválido');

  })

  it.skip('❌ EDITAR UMA EMPRESA INEXISTENTE', async () => {
    const publicId = '424e3353-b4ae-48ce-9cbe-12079fd071d4'
    const body = {
      ...baseBody,      
    }
    
    const res = await request(app)
      .put(`/empresas/${publicId}`)
      .send(body)      
    
    expect(res.body.message).toContain('Empresa não encontrada')
  })

  it.skip('❌ EDITAR CAMPOS FORA DO PADRÃO', async () => {
    const publicId = '424e3353-b4ae-48ce-9cbe-12079fd071d3'
    
    const body = {
      ...baseBody,
      cnpj: null
    };

    const res = await request(app)
      .put(`/empresas/${publicId}`)
      .send(body);

    expect(res.body.errors[0].msg).toBeTruthy()
    
  })
  
  it.skip('❌ EDITAR EMAIL EXISTENTE EM OUTRA EMPRESA', async () => {
    const publicId = '424e3353-b4ae-48ce-9cbe-12079fd071d3'

    const body = {
      ...baseBody,
      cnpj: '04252011000110',
      email: '1pedro@novaempresa.com.br',
    }

    const res = await request(app)
      .put(`/empresas/${publicId}`)
      .send(body) 

    expect(res.body).toEqual({
      error: `E-mail: ${body.email} já está sendo usado por outro cadastro`
    })
      
  })

  it.skip('✅ EDITAR', async () => {
    const publicId = '424e3353-b4ae-48ce-9cbe-12079fd071d3'

    const body = {      
      razao_social:"Bento Ribeiro Gonçalves",  
      cnpj: "04252011000110",  
      email: "lala2@novaempresa.com.br",
      tipo_pessoa: "PF"
    }

    const res = await request(app)
      .put(`/empresas/${publicId}`)
      .send(body) 

    expect(res.statusCode).toBe(200)      
  })
})


