const GET_ALL_USUARIOS = `
  SELECT *
  FROM x12_usuarios
  WHERE deletedAt IS NULL
  ORDER BY id ASC
`

// const GET_EMPRESA_BY_ID = `
//   SELECT *
//   FROM x12_usuarios
//   WHERE public_id = ?
//   AND deletedAt IS NULL
// `;

// const INSERT_EMPRESA = `
//   INSERT INTO x12_usuarios (public_id, razao_social, cnpj, email, tipo_pessoa)
//   VALUES (?, ?, ?, ?, ?)
// `;

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

// const GET_EMPRESA_EMAIL = `
//   SELECT count(*) AS emails
//   FROM x12_usuarios
//   WHERE email= ?  
// `;

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
  GET_ALL_USUARIOS
  // GET_EMPRESA_BY_ID,
  // INSERT_EMPRESA,
  // UPDATE_EMPRESA,
  // DELETE_EMPRESA,
  // GET_EMPRESA_EMAIL,
  // GET_EMPRESA_EMAIL_CNPJ,
  // GET_EMPRESA_CNPJ
}