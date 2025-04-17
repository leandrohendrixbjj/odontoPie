// Health Check: verificar se a aplicação está funcionando.

const express = require('express')
const router = express.Router()

router.get('/ping', (req, res) => {
  res.send('pong')
})

module.exports = router
