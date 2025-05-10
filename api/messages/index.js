module.exports = (data) => {
  return {
    error: {
      getAll: `Erro ao buscar ${data}`,    
      getById: `Erro ao buscar ${data} por ID`,
      create: `Erro ao criar ${data}`,
      update: `Erro ao atualizar ${data}`,
      delete: `Erro ao atualizar ${data}`,
      findByEmail: `Erro na consuta ${data}`,
      findByCnpj: `Erro na consuta ${data}`,
    }
  }
}
