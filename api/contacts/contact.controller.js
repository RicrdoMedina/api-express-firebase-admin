'use strict'

const fs = require('fs')
const firebase = require('../../firebase-admin/admin')

function readFileJson() {
  const file = 'data/contacts.json'
  return fs.readFileSync(file)
}

module.exports = {
  getContacts: function (req, res) {
    // const data = readFileJson()
    // const json = JSON.parse(data)
    // const contacts = json.contacts
    // res.send(contacts)
    const ref = firebase.database().ref('contacts')
    ref.once('value',
      (result) => {
        let contacts = result.val()
        if (!contacts) {
          contacts = []
        }
        res.send(contacts)
      },
      (error) => {
        res.send(error)
      }
    );
  },
  getContact: function (req, res) {
    const id = req.params.id
    // const data = readFileJson()
    // const json = JSON.parse(data)
    // const contacts = json.contacts
    const ref = firebase.database().ref('contacts')
    ref.once('value',
      (result) => {
        let contacts = result.val()
        if (!contacts) {
          contacts = []
        }
        for (var i = 0; i < contacts.length; i++) {
          let contact = contacts[i]
          if (contact.id == id) {
            res.send(contact)
            return
          }
        }
        res.status(404).send({})
      },
      (error) => {
        res.send(error)
      }
    );
  },
  updateContact: function (req, res) {
    let contactUpdate = req.body
    // const data = readFileJson()
    // const json = JSON.parse(data)
    // let contacts = json.contacts
    let isUpdate = false
    const ref = firebase.database().ref('contacts')
    let contacts
    ref.once('value',
      (result) => {
        contacts = result.val()
        if (!contacts) {
          contacts = []
        }
        for (var i = 0; i < contacts.length; i++) {
          let contact = contacts[i]
          if (contact.id == contactUpdate.id) {
            contacts[i] = contactUpdate
            isUpdate = true
          }
        }
        if (!isUpdate) contacts.push(contactUpdate)
        ref.set(contacts, (error) => {
          if (error) {
            res.send(error)
          } else {
            res.send(contacts)
          }
        })
      },
      (error) => {
        res.send(error)
      }
    );
  },
  newContact: function (req, res) {
    let newContact = req.body
    // const data = readFileJson()
    // const json = JSON.parse(data)
    // let contacts = json.contacts
    // contacts.push(contactnNew)
    // res.send(contacts)
    const ref = firebase.database().ref('contacts')
    ref.once('value',
      (result) => {
        let contacts = result.val()
        if (!contacts) {
          contacts = []
        }
        contacts.push(newContact)
        ref.set(contacts, (error) => {
          if (error) {
            res.send(error)
          } else {
            res.send(contacts)
          }
        })
      },
      (error) => {
        res.send(error)
      }
    );
  },
  deleteContact: function (req, res) {
    const id = req.params.id
    // const data = readFileJson()
    // const json = JSON.parse(data)
    // const contacts = json.contacts
    const ref = firebase.database().ref('contacts')
    ref.once('value',
    (result) => {
        let contacts = result.val()
        if (!contacts) {
          contacts = []
        }
        for (var i = 0; i < contacts.length; i++) {
          var contact = contacts[i]
          if (contact.id == id) {
            contacts.splice(i, 1)
          }
        }
        ref.set(contacts, (error) => {
          if (error) {
            res.send(error)
          } else {
            res.send(contacts)
          }
        })
      },
      (error) => {
        res.send(error)
      }
    );
  }
}