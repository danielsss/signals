[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a09ab2edb2854d93b373888bd3a722ac)](https://www.codacy.com/app/danielsss/signals?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=danielsss/signals&amp;utm_campaign=Badge_Grade)

# Signal salt

adding salt before node process exit

## Installation

```shell
npm i --save signals
```

## Usage

```js
const Signals = require('signals');

const exit = new Signals();
exit.before([fn1, fn2, fn3]);
// also: exit.before(fn1, context); context default: null
//       exit.before(fn2, context);

exit.SIGTERM(); // start to listen the signal of sigterm
// also work if the lowerEventName specified `true` value
// exit.sigterm(); 

exit.emit('SIGTERM'/* sigterm */); // Trigger event 
```

Also see: [Examples](test/__example__)

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