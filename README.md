# next-payments [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> 

## Installation

```sh
$ npm install --save next-payments
```

## Usage

Using the ConektaCard provider in production mode you need to set the CONEKTA_API_KEY env variable:

```js
process.env.CONEKTA_API_KEY = "your_api_key";
```

```js
// If you plan to use conektacard provider: 
var nextPayments = require('next-payments').default;

var payment = new nextPayments('ConektaCard', {
  card: 'tok_test_visa_4242', 
  amount: 5000, 
  currency: 'mxn', 
  reference_id: 'S1550', 
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
