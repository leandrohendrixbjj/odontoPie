console.clear()

const express = require('express')
const corsMiddleware = require('./middleware/config/corsConfig')
const errorHandler = require('./middleware/config/errorHandler')
const apiRoutes = require('./middleware/rotas/apiRoutes')
const checkDatabaseConnection = require('./middleware/config/check-db-connection')

const app = express()
const PORT = process.env.PORT || 3000

app.use(corsMiddleware)
app.use(express.json())
app.use(apiRoutes)
app.use(errorHandler) // sempre por último

// Sobe o servidor apenas se a conexão com o banco de dados estiver ok
checkDatabaseConnection().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`)
  })
})

