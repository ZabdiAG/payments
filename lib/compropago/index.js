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
  static verifyPayment (id, amount) {
    return new Promise((resolve, reject) => {
      CompropagoSDK.Charge.find(id)
        .then(res => {
          if (res.data.type === 'error') {
            reject(res.data)
          }
          const SUCCESS = 'charge.success'
          let isSucced = res.data.type === SUCCESS
          let isPaid = res.data.paid
          let isCorrectAmount = res.data.amount === amount
          resolve(isSucced && isPaid && isCorrectAmount)
        })
        .catch(err => {
          reject(err)
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
