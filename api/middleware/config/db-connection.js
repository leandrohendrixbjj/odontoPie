const connection = require('../../infra/mysq-connection')

connection.connect((err) => {
    if (err) throw err
    console.log('✅ Conectado ao MySQL!')
  })