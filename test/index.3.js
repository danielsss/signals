'use strict';

const Signals = require('..');

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

const arr = [fn1, fn2, fn3];
s.before(arr);

s.sigterm();

process.emit('SIGTERM');