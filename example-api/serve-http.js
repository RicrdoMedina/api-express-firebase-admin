'use strict'

const http = require('http')
const hostname = '127.0.0.1'
const port = 3000

const server = http.createServer((request, response) => {
  response.statusCode = 200
  response.setHeader('Content-Type', 'text/html')
  response.end('<h1>Hola mundo!</h1>')
})

server.listen(port,hostname, () => {
  console.log(`El servidor esta corriendo sobre http://${hostname}:${port}`)
})