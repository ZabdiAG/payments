# next-payments [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> 

## Installation

```sh
$ npm install --save next-payments
```

## Usage

```js
var nextPayments = require('next-payments').default;

var payment = new nextPayments('ConektaCard', {});

payment.process()
  .then(function (res) {
  })
  .catch(function (err) {
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
