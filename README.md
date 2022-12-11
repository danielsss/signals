[![Build Status](https://travis-ci.org/danielsss/signals.svg?branch=master)](https://travis-ci.org/danielsss/signals)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/a09ab2edb2854d93b373888bd3a722ac)](https://www.codacy.com/app/danielsss/signals?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=danielsss/signals&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/a09ab2edb2854d93b373888bd3a722ac)](https://www.codacy.com/app/danielsss/signals?utm_source=github.com&utm_medium=referral&utm_content=danielsss/signals&utm_campaign=Badge_Coverage)


# Signal salt

adding salt before node process exit

## Dependencies

Node.js version >= 7.0.\*

## Installation

```shell
npm i --save signaleries
```

## Usage

```js
const Signaler = require('signaleries');

const exit = new Signaler();
exit.before([function(){
  // logic code
  process.exit(0); // exit with the success code
}]);
// also: exit.before(fn1, context); context default: null
//       exit.before(fn2, context);

exit.SIGTERM(); // start to listen the signal of sigterm
// also work if the lowerEventName specified `true` value
// exit.sigterm(); 

exit.emit('SIGTERM'/* sigterm */); // Trigger event 
```

Also see: [Examples](test/__example__)

## Methods of `signaleries`

* **.before([fn1, fn2], context)** - only accept function or function of `Array`
* **.remove(name | index)** - remove one with the hook you added
* **.names()** - show you all names of hook you added

## The signals that can be listened


##### Defaults

* **SIGABRT**
* **SIGALRM**
* **SIGHUP**
* **SIGINT**
* **SIGTERM**

##### Non-win32

* **SIGVTALRM**
* **SIGXCPU**
* **SIGXFSZ**
* **SIGUSR2**
* **SIGTRAP**
* **SIGSYS**
* **SIGQUIT**
* **SIGIOT**

##### Linux

* **SIGIO**
* **SIGPOLL**
* **SIGPWR**
* **SIGSTKFLT**
* **SIGUNUSED**
