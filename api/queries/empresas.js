const GET_ALL_EMPRESAS = `
  SELECT *
  FROM T01_empresas
  WHERE deletedAt IS NULL
  ORDER BY razao_social ASC
`;

const GET_EMPRESA_BY_ID = `
  SELECT *
  FROM T01_empresas
  WHERE public_id = ?
  AND deletedAt IS NULL
`;

const INSERT_EMPRESA = `
  INSERT INTO T01_empresas (public_id, razao_social, cnpj, email, tipo_pessoa)
  VALUES (?, ?, ?, ?, ?)
`;

const UPDATE_EMPRESA = `
  UPDATE T01_empresas SET
    razao_social = ?,    
    email = ?,
    tipo_pessoa = ?
  WHERE public_id = ?
`;

const DELETE_EMPRESA = `
  UPDATE T01_empresas SET
    deletedAt = NOW()
  WHERE public_id = ?
`;

const GET_EMPRESA_EMAIL = `
  SELECT count(*) AS emails
  FROM T01_empresas
  WHERE email= ?  
`;

const GET_EMPRESA_EMAIL_CNPJ = `
  SELECT count(*) AS emails
  FROM T01_empresas
  WHERE email= ?  
  AND cnpj= ?
`;

const GET_EMPRESA_CNPJ = `
  SELECT count(*) AS cnpjs
  FROM T01_empresas
  WHERE cnpj= ?  
`;


module.exports = {
  GET_ALL_EMPRESAS,
  GET_EMPRESA_BY_ID,
  INSERT_EMPRESA,
  UPDATE_EMPRESA,
  DELETE_EMPRESA,
  GET_EMPRESA_EMAIL,
  GET_EMPRESA_EMAIL_CNPJ,
  GET_EMPRESA_CNPJ
};