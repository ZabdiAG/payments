import assert from 'assert';
import ConektaCard from '../../lib/ConektaCard';

describe('#process', () => {
  it('throws response object', () => {
    let conektaCard = new ConektaCard();

    conektaCard.process(res => {
      assert.equals(res.constructor.name, 'Response');
    });
  });

  it('process a valid charge', () => {
    let conektaCard = new ConektaCard({
      description: 'Stogies',
      amount: 5000,
      currency: 'mxn',
      reference_id: '98123-gave-me', // eslint-disable-line
      card: 'tok_test_visa_4242', // demo testing card
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

    conektaCard.process(res => {
      console.log(res);
      assert(true);
    });
  });

  it('pass invalid parameters charge', ()=> {
    let conektaCard = new ConektaCard({
      description: 'Stogies',
      reference_id: '98123-gave-me', // eslint-disable-line
      card: 'tok_test_visa_4242', // demo testing card
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
    conektaCard.process(res => {
      console.log('second one');
      console.log(res);
      assert(true);
    });

  
  });
});
