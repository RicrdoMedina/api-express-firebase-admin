'use strict'
const express = require('express')
const boadyParser = require('body-parser')

const app = express()
const PORT = 3000

app.use(boadyParser.json())

app.get('/saludar', (request, response) => {
  response.send('hola')
})

var user = {
  'user': 'rcrd',
  'password': '1234'
}

app.get('/usuario', (request, response) => {
  response.setHeader('Content-type', 'text/json')
  response.send({'operacion': 'GET', 'user': user})
})

app.post('/usuario', (request, response) => {
  response.setHeader('Content-type', 'text/json')
  user = request.body
  response.send({'operacion': 'POST', 'user': user})
})

app.put('/usuario', (request, response) => {
  response.setHeader('Content-type', 'text/json')
  user = request.body
  response.send({'operacion': 'PUT', 'user': user})
}) 

app.delete('/usuario', (request, response) => {
  response.setHeader('Content-type', 'text/json')
  user = {}
  response.send({'operacion': 'delete', 'user': user})
})

app.listen(PORT, () => {
  console.log(`El server esta en escucha en el puerto ${PORT}`)
})