'use strict';

const Signals = require('../..');
const s = new Signals({eventNameLower: true});

s.sigterm();
s.SIGTERM();