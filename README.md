# next-payments [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> 

## Installation

```sh
$ npm install --save next-payments
```

## Usage

If you plan to use Conekta as a payment method, you need to set an environment variable to work with, its name is CONEKTA_API_KEY and you can get it from

https://www.conekta.io/es

```js
// If you plan to use conektacard provider: 
var nextPayments = require('next-payments').default;

var payment = new nextPayments('ConektaCard', {
  amount: 100,
  currency: 'mxn',
  description: 'short description',
  reference_id: '001-id-test',
  card: 'tok_test_visa_4242', // sample card from conekta
  details: {
    phone: '1231232323',
    name: 'John Doe',
    email: 'john@doe.com'
    line_items: [{
      name: 'Box of Cohiba',
      description: 'Imported From Mex',
      unit_price: 3500,
      quantity: 1,
      tags: ['food', 'mexican food'],
      type: 'physical'
    }]
  }
});

payment.process()
  .then( res => {
    // process valid 
  })
  .catch( err => {
    // when an error occurs
  });
```
## License

MIT © [colin]()


[npm-image]: https://badge.fury.io/js/next-payments.svg
[npm-url]: https://npmjs.org/package/next-payments
[travis-image]: https://travis-ci.org/skydropx/next-payments.svg?branch=master
[travis-url]: https://travis-ci.org/skydropx/next-payments
[daviddm-image]: https://david-dm.org/skydropx/next-payments.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/skydropx/next-payments
