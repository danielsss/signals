'use strict';

const debug = require('debug')('signals:index');
const os = require('os');

const signals = os.constants.signals;

const INIT = Symbol('_init');

class Signals {
  constructor(options={}) {
    this.hooks = [];
    this[INIT]();
  }

  before(fn, context=null) {
    if (typeof fn !== 'function') {
      if (!Array.isArray(fn)) {
        throw new Error('before hook accept function or array<function>');
      }

      for (const func of fn) {
        if (typeof func !== 'function') {
          this.hooks = [];
          throw new Error(`${func} must be a function`);
        }
        this.hooks.push(func.bind(context));
      }
    } else {
      this.hooks.push(fn.bind(context));
    }
  }

  [INIT]() {
    const keys = Object.keys(signals);
      for (const key of keys) {
        const lower = key.toLowerCase();
        this[lower] = function() {
          let idx = 0;
          const recursive = async (...args) => {
            if (this.hooks.length === 0) {
              debug('empty hooks');
              return false;
            }

            try {
              if (this.hooks.length === idx) {
                return true;
              }
              idx++;
              recursive(await this.hooks[idx - 1].apply(this, args));
            } catch (err) {
              throw err;
            }
          };
          process.on(key, recursive);
        }
      }
  }
}

module.exports = Signals;