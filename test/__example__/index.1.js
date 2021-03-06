'use strict';

const Signals = require('../..');

const s = new Signals();

const fn1 = () => {
  console.info(1);
  return 1;
};

const fn2 = () => {
  console.info(2);
  return 2;
};

const fn3 = () => {
  console.info(3);
  return 3;
};

s.before(fn1);
s.before(fn2);
s.before(fn3);

s.sigterm();

process.emit('SIGTERM');