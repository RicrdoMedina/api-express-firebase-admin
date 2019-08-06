'use strict'

const express = require('express')
const controller = require('./contact.controller')
const validator = require('../../middleware/validator')
const router = express.Router()

router.get('/', controller.getContacts)
router.get('/:id', controller.getContact)
router.post('/', controller.updateContact)
router.put('/', controller.newContact)
router.delete('/:id', [validator.isNumber],controller.deleteContact)

module.exports = router