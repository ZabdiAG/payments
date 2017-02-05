import Promise from 'bluebird';
import Conekta from 'conekta';
import Joi from 'joi';
import AbstractProvider from '../AbstractProvider';

Conekta.api_key = process.env.CONEKTA_API_KEY || 'key_eYvWV7gSDkNYXsmr'; // eslint-disable-line

const schema = Joi.object({
  card: Joi.string().required(),
  amount: Joi.number().required(),
  currency: Joi.string().valid('mxn').required(),
  reference_id: Joi.string().required(), // eslint-disable-line
  details: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    line_items: Joi.array().items(Joi.object().keys({ // eslint-disable-line
      name: Joi.string().required(),
      description: Joi.string().required(),
      unit_price: Joi.number().required(), // eslint-disable-line
      quantity: Joi.number().required(),
      sku: Joi.string().required(),
      category: Joi.string().required()
    })).required()
  }).required()
});

export default class ConektaCard extends AbstractProvider {
  _purchase(params) {
    return new Promise((resolve, reject) => {
      Conekta.Charge.create(params, (err, res) => {
        if (err) {
          reject(err);
        }

        resolve(res);
      });
    });
  }
}
