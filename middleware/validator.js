'use strict'
const firebase = require('../firebase-admin/admin')
module.exports = {
  verifyToken: async function (req, res, next) {
  const idToken = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjcyODRlYTZiNGZlZDBmZDc1MzE4NTg2NDZmZDYzNjE1ZGQ3YTIyZjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYXBpLW5vZGUtOTVjMzgiLCJhdWQiOiJhcGktbm9kZS05NWMzOCIsImF1dGhfdGltZSI6MTU2NTA0OTIzOSwidXNlcl9pZCI6ImN2ejROQ1ZTcVhZZGMzdUt5TjhnbGlEMWdXbDIiLCJzdWIiOiJjdno0TkNWU3FYWWRjM3VLeU44Z2xpRDFnV2wyIiwiaWF0IjoxNTY1MDQ5MjQ2LCJleHAiOjE1NjUwNTI4NDYsImVtYWlsIjoicmNyZG1lZGluYTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbInJjcmRtZWRpbmE2QGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.rzvS8JAZ-JF7yP-SOgyGOgJJ3vGtnzEXrAuoKFGIMkoY-7oF4P1B2xRdB-iQ6hLY1oE-fcjiWD4NVpnVn_SCEB1wl8dvatYHsONiZG1GhVMr28GAIl9jI7QJYOSr2ZTeUMWTwxyliKNdnQya1aA__B7F_gAUUY6LV1OT9NOwquS6k5V9UwmnMNNBorFGIlU_xaEggR_UdSD0ETOD1f-Dl_HunhcC212KTTz6ebTje9SDwV-6AM0bCzLS0TB2yRp81C5Ala0NBo94ZyxvtoVJ5lftmCF-PWQzGBzOcc4uJM6STt48ZS5Y5L9pBQIr-01G2PFxaiOWI7h9ac1sZKK_YQ'

  //const idToken = ''
   
   try {
    const decodedToken = await firebase.auth().verifyIdToken(idToken)

    if (decodedToken) {
      req.body.uid = decodedToken.uid
      return next()
    } else {
      return res.status(401).send('you ara not authorized')
    }
   } catch (e) {
    return res.status(401).send('You are not authorized')
   }
  },
  isNumber: function (req, res, next) {
    const id = req.params.id
    if (!isNaN(id)) {
      next()
    } else {
      res.send({ "error": "El parametro es invalido, debe ser el id un numero de id" })
    }
  }
}