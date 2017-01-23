import {assert} from 'chai';
import ConektaCard from '../../lib/ConektaCard';

describe('#process', () => {
  it('throws response object', () => {
    let conektaCard = new ConektaCard();

    return conektaCard.process()
      .then(assert.fail)
      .catch(err => {
        assert(err.constructor.name, 'Response');
      });
  });

  it('process a valid charge', () => {
    let conektaCard = new ConektaCard({
      description: 'Stogies',
      amount: 5000,
      currency: 'mxn',
      reference_id: '98123-gave-me', // eslint-disable-line
      card: 'tok_test_visa_4242',
      details: {
        email: 'john@doe.com',
        name: 'John Doe',
        phone: '1231233232',
        line_items: [   // eslint-disable-line
          {
            name: 'Box of Cohiba S1s',
            description: 'Imported From Mex.',
            unit_price: 2000, // eslint-disable-line
            quantity: 1,
            sku: 'cohb_s1',
            type: 'food'
          }
        ]
      }
    });

    return conektaCard.process()
      .then(res => {
        assert(true, res);
      })
      .catch(assert.fail);
  });

  it('process a invalid charge', () => {
    let conektaCard = new ConektaCard({
      card: 'tok_test_visa_5020'
    });

    return conektaCard.process()
      .then(assert.fail)
      .catch(err => {
        assert(true, err);
      });
  });
});
