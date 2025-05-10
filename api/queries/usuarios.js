const GET_ALL_USUARIOS = `
  SELECT public_id, nome, email, situacao, createdAt, updatedAt, deletedAt, perfil_id  
  FROM x12_usuarios
  WHERE deletedAt IS NULL
  ORDER BY id ASC
`

const GET_USUARIOS_BY_ID = `
  SELECT public_id, nome, email, situacao, createdAt, updatedAt, deletedAt, perfil_id
  FROM x12_usuarios
  WHERE public_id = ?
  AND deletedAt IS NULL
`;

const INSERT_USUARIOS = `
  INSERT INTO x12_usuarios (public_id, nome, email, senha, empresa_id, perfil_id)
  VALUES (?, ?, ?, ?, ?, ?)
`;

// const UPDATE_EMPRESA = `
//   UPDATE x12_usuarios SET
//     razao_social = ?,    
//     email = ?,
//     tipo_pessoa = ?
//   WHERE public_id = ?
// `;

// const DELETE_EMPRESA = `
//   UPDATE x12_usuarios SET
//     deletedAt = NOW()
//   WHERE public_id = ?
// `;

const GET_USUARIO_EMAIL = `
  SELECT count(*) AS emails
  FROM x12_usuarios
  WHERE email= ?  
`;

// const GET_EMPRESA_EMAIL_CNPJ = `
//   SELECT count(*) AS emails
//   FROM x12_usuarios
//   WHERE email= ?  
//   AND cnpj not in (?)
// `;

// const GET_EMPRESA_CNPJ = `
//   SELECT count(*) AS cnpjs
//   FROM x12_usuarios
//   WHERE cnpj= ?  
// `;


module.exports = {
  GET_ALL_USUARIOS,
  GET_USUARIOS_BY_ID,
  INSERT_USUARIOS,
  // UPDATE_EMPRESA,
  // DELETE_EMPRESA,
  GET_USUARIO_EMAIL
  // GET_EMPRESA_EMAIL_CNPJ,
  // GET_EMPRESA_CNPJ
}