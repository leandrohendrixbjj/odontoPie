const GET_ALL_EMPRESAS = `
  SELECT *
  FROM x12_empresas
  WHERE deletedAt IS NULL
  ORDER BY id ASC
`

const GET_EMPRESA_BY_ID = `
  SELECT *
  FROM x12_empresas
  WHERE public_id = ?
  AND deletedAt IS NULL
`

const INSERT_EMPRESA = `
  INSERT INTO x12_empresas (public_id, razao_social, cnpj, email, tipo_pessoa)
  VALUES (?, ?, ?, ?, ?)
`

const UPDATE_EMPRESA = `
  UPDATE x12_empresas SET
    razao_social = ?,    
    email = ?,
    tipo_pessoa = ?
  WHERE public_id = ?
`

const DELETE_EMPRESA = `
  UPDATE x12_empresas SET
    deletedAt = NOW()
  WHERE public_id = ?
`

const GET_EMPRESA_EMAIL = `
  SELECT count(*) AS emails
  FROM x12_empresas
  WHERE email= ?  
`

const GET_EMPRESA_EMAIL_CNPJ = `
  SELECT count(*) AS emails
  FROM x12_empresas
  WHERE email= ?  
  AND cnpj not in (?)
`

const GET_EMPRESA_CNPJ = `
  SELECT count(*) AS cnpjs
  FROM x12_empresas
  WHERE cnpj= ?  
`


module.exports = {
  GET_ALL_EMPRESAS,
  GET_EMPRESA_BY_ID,
  INSERT_EMPRESA,
  UPDATE_EMPRESA,
  DELETE_EMPRESA,
  GET_EMPRESA_EMAIL,
  GET_EMPRESA_EMAIL_CNPJ,
  GET_EMPRESA_CNPJ
}