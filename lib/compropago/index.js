import Promise from 'bluebird'
import CompropagoSDK from 'compropago-node'
import AbstractProvider from '../AbstractProvider'
import Joi from 'joi'
import Response from './response'

const schema = Joi.object({
  order_id: Joi.string().required(),
  order_price: Joi.number().precision(2).required(),
  order_name: Joi.string().required(),
  customer_name: Joi.string().required(),
  customer_email: Joi.string().email().required(),
  payment_type: Joi.string().required()
})

export default class ComproPago extends AbstractProvider {
  static verifyPayment (amount, params = {}) {
    return new Promise((resolve, reject) => {
      ComproPago.Charge.find(params.id)
        .then(charge => {
          let isPaid = charge.status === 'charge.paid'
          let isCorrectAmount = charge.amount === amount

          return isPaid && isCorrectAmount
        })
      .catch(err => {
        return false
      })
    })
  }

  _purchase () {
    return new Promise((resolve, reject) => {
      CompropagoSDK.Charge.create(this.params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  _schemaObj () {
    return schema
  }

  _respObj (params) {
    return new Response(params)
  }
}
