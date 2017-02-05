import {expect, assert} from 'chai'
import ConektaCard from '../../lib/ConektaCard'
import nock from 'nock'

describe('#process', () => {
  it('throws response object', () => {
    let conektaCard = new ConektaCard()

    return conektaCard.process()
      .then(assert.fail)
      .catch(err => {
        assert(err.constructor.name, 'Response')
      })
  })

  it.only('process a valid charge', () => {
    nock('https://api.conekta.io')
      .post('/charges')
      .reply(200, {
        status: 200,
        message: 'simulated conekta response'
      })

    let conektaCard = new ConektaCard({
      amount: 5000,
      reference_id: 'S1550',
      card: 'tok_test_visa_4242',
      currency: 'mxn',
      description: 'servicio de mensajeria',
      details: {
        email: 'rdz@gmail.com',
        name: 'arnoldo rdz',
        phone: '8114689871',
        line_items: [
          {
            name: 'guia',
            description: 'servicio mensajeria',
            unit_price: 5000,
            quantity: 1
          }
        ]
      }
    })

    return conektaCard.process()
      .then(res => {
        expect(res.errors).to.equal(null)
      }).catch(err => {
        console.log(err)
      })
  })

  it('process an invalid charge', () => {
    let conektaCard = new ConektaCard({
      card: 'tok_test_visa_5020'
    })

    return conektaCard.process()
      .then(assert.fail)
      .catch(err => {
        assert(true, err)
      })
  })
})
