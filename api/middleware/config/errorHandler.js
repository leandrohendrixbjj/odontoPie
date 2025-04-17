module.exports = (err, req, res, next) => {
    console.error('💥 ERRO DETECTADO:', err.stack)
  
    res.status(500).json({
      error: 'Erro interno do servidor',
      message: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
  }
  