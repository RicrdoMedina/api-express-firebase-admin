'use strict'

function route (app) {
  app.use('/api/contacts', require('./api/contacts'))
}

module.exports = route