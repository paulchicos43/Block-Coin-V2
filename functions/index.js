const functions = require('firebase-functions')
const admin = require('firebase-admin')
admin.initializeApp()
const plaid = require('plaid')
const plaidClient = new plaid.Client({
    clientID: '5f08b5935cbe90001101a460',
    secret: 'c76b140e9f4a71498744c839704cb3',
    env: plaid.environments.sandbox,
})
//const stripe = require('stripe')('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')
const stripe = require('stripe')('sk_test_51HMMXjABsM8C4BZJP8s2cxGE25gLx2nFspq3OtwFrwG6XJ5IKGSxiEVTz2JITlN6IpIZlEM81Ckl1h3vNmvegUc4002JKY2DZ4')
exports.getBalance = functions.https.onCall((data, context) => {
    return { balance: 0 }
})

exports.handlePlaid = functions.https.onCall(async (data, context) => {
    let access_token, item_id, stripe_bank_account_token
    plaidClient.exchangePublicToken(data.public_token, async (err, res) => {
        if (err === null) {
            access_token = res.access_token
            item_id = res.item_id
            plaidClient.createStripeToken(access_token, data.account_id, async (err, res) => {
                stripe_bank_account_token = res.stripe_bank_account_token
                const customer = await stripe.customers.create({
                    description: 'customer',
                    source: stripe_bank_account_token,
                })
                if (err === null) {
                    await admin.firestore().collection('plaid').doc(context.auth.uid).set({
                        access_token: access_token,
                        item_id: item_id,
                        stripe_bank_account_token: stripe_bank_account_token,
                        customer: customer.id
                    })
                }
            })
        }
    })
})





exports.placeOrder = functions.https.onCall(async (data, context) => {
    const uid = context.auth.uid
    const customer = await admin.firestore().collection('plaid').doc(uid).get()
    stripe.charges.create({
        amount: data.amount * 100,
        currency: 'usd',
        customer: customer.data().customer,
    })
        .then(async (charge) => {
            admin.firestore().collection('charges').add({
                from: uid,
                charge: charge,
            })
            const balanceDoc = await admin.firestore().collection('balances').doc(uid).get()
            admin.firestore().collection('balances').doc(uid).set({
                balance: balanceDoc.data().balance + data.amount
            })
            return
        })
        .catch(() => {

        })

})