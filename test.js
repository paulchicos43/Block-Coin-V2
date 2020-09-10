const plaid = require('plaid')
const plaidClient = new plaid.Client({
    clientID: '5f08b5935cbe90001101a460',
    secret: 'c76b140e9f4a71498744c839704cb3',
    env: plaid.environments.sandbox,
})
const stripe = require('stripe')('sk_test_51HMMXjABsM8C4BZJP8s2cxGE25gLx2nFspq3OtwFrwG6XJ5IKGSxiEVTz2JITlN6IpIZlEM81Ckl1h3vNmvegUc4002JKY2DZ4')
const public_token = 'public-sandbox-b2d6d39c-44d6-4dc2-a0bf-196385253ab0'
const account_id = '377VyLdJvjh9VQ3vLvxnIWPRJ19doKiqR9o5p'
const thing = async () => {
    const charge = await stripe.charges.create({
        amount: 5000,
        currency: 'usd',
        customer: 'cus_HzZbfgN0qKoCYS',
    });
    console.log(charge)
}

thing()