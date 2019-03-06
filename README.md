# Signal salt

adding salt before node process exit

## Installation

coming soon ...

## Usage

```js
const Signals = require('signals');

const options = {
  lowerEventName: true, // default: false
  listener: 'events', // default: process.on(...)
};

const exit = new Signals(options);
exit.before([fn1, fn2, fn3]);
// also: exit.before(fn1, context); context default: null
//       exit.before(fn2, context);

exit.SIGTERM(); // start to listen the signal of sigterm
// also work if the lowerEventName specified `true` value
// exit.sigterm(); 

process.emit('SIGTERM'/* sigterm */); // Trigger event 
```

## Others

preparing ...