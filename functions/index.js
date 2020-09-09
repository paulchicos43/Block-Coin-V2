const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()


exports.getBalance = functions.https.onCall((data, context) => {
    return { balance: 0 }
})

exports.handlePlaid = functions.https.onCall((data, context) => {
    admin.firestore().collection('plaid').doc(context.auth.uid).set({
        public_key: data.public_key,
    })
})