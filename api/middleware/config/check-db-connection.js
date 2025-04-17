const db = require('../../infra/mysq-connection')

async function checkDatabaseConnection() {
  try {
    await db.query('SELECT 1')
    console.log('✅ Conexão com o banco MySQL verificada com sucesso.')
  } catch (err) {
    console.error('❌ ERRO: Falha na conexão com o banco de dados.')
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = checkDatabaseConnection
