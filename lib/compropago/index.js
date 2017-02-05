import Promise from 'bluebird'
import Joi from 'joi'
import Compropago from 'compropago-node'
import AbstractProvider from '../AbstractProvider'

const schema = Joi.object({
  order_id: Joi.string().required(),
  order_price: Joi.number().precision(2).required(),
  order_name: Joi.string().required(),
  customer_name: Joi.string().required(),
  customer_email: Joi.email().required(),
  payment_type: Joi.string().required()
})

export default class ComproPago extends AbstractProvider {
  _purchase () {
    return new Promise((resolve, reject) => {
      Compropago.Charge.create(this.params)
        .then(resolve)
        .catch(reject)
    })
  }

  _schemaObj () {
    return schema
  }
}
