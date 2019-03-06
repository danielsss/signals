# Signal salt

adding salt before node process exit

## Installation

```shell
npm i --save signals
```

## Usage

```js
const Signals = require('signals');

const options = {
  lowerEventName: true,
  listener: 'events',
};

const exit = new Signals(options);
exit.before([fn1, fn2, fn3]);
// also: exit.before(fn1, context); context default: null
//       exit.before(fn2, context);

exit.SIGTERM(); // start to listen the signal of sigterm
// also work if the lowerEventName specified `true` value
// exit.sigterm(); 

exit.emit('SIGTERM'/* sigterm */); // Trigger event 
```

Also see: [Examples](test/__example__)

## Options of `Signals`

* `lowerEventName` - the lower name of method will be created, otherwise only has upper name.
* `listener` - [ `process` | `EventEmitter` ] are supported currently. [ `default`: process ]

## Contents of `Signals`

* **.before([fn1, fn2], context)** - only accept function or function of `Array`

## LICENCE

MIT License

Copyright (c) 2019 Danielsss

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.