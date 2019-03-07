'use strict';

// default signals
const DEFAULTS_SIGNALS = [
  'SIGABRT',
  'SIGALRM',
  'SIGHUP',
  'SIGINT',
  'SIGTERM',
];

const NON_WIN32 = [
  'SIGVTALRM',
  'SIGXCPU',
  'SIGXFSZ',
  'SIGUSR2',
  'SIGTRAP',
  'SIGSYS',
  'SIGQUIT',
  'SIGIOT',
];

const LINUX = [
  'SIGIO',
  'SIGPOLL',
  'SIGPWR',
  'SIGSTKFLT',
  'SIGUNUSED',
];

if (process.platform !== 'win32') DEFAULTS_SIGNALS.concat(NON_WIN32);
if (process.platform === 'linux') DEFAULTS_SIGNALS.concat(LINUX);

module.exports = DEFAULTS_SIGNALS;
