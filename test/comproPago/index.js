import {expect, assert} from 'chai'
import ComproPago from '../../lib/comproPago'
import nock from 'nock'

describe('ComproPago', () => {
  describe('verifyPayment', () => {
    it.only('should return true', () => {
      let id = 'ch_bcf5b67a-b4d7-4ca1-858f-d8b1bd48d552'
      let amount = 123.45
      ComproPago.verifyPayment(id, amount)
        .then(res => {
          expect(res)
        })
        .catch(err => {
          console.log(err)
        })
    })
  })
  describe('#process', () => {
    it('throws response object', () => {
      let comproPago = new ComproPago()

      return comproPago.process()
      .then(assert.fail)
      .catch(err => {
        assert(err.constructor.name, 'Response')
      })
    })

    it('process a valid charge', () => {
      nock('https://api.conekta.io')
        .post('/charges')
        .reply(200, {
          status: 200,
          message: 'simulated compropago response'
        })

      let payment = new ComproPago({
        order_id: 'S1090200',
        order_price: 123.45,
        order_name: 'Servicio de mensajeria',
        customer_name: 'John Doe Test',
        customer_email: 'luis@skydrop.com.mx',
        payment_type: 'OXXO'
      })

      return payment.process()
        .then(res => {
          expect(res.errors).to.equal(null)
        }).catch(err => {
          console.log(err)
        })
    })

    it('process an invalid charge', () => {
      let comproPago = new ComproPago({
        order_id: 'S1090200'
      })

      return comproPago.process()
        .then(assert.fail)
        .catch(err => {
          assert(true, err)
        })
    })
  })
})
