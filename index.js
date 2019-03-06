'use strict';

const {EventEmitter} = require('events');
const debug = require('debug')('signals:index');
const os = require('os');

const signals = os.constants.signals;

const INIT = Symbol('_init');

class Signals extends EventEmitter {
  constructor(options={}) {
    super(options);

    this.listener = options.listener || 'process';
    this.lower = options.lowerEventName || false;
    this.hooks = [];
    this[INIT]();
  }

  /**
   * @description Adding hooks before program exit
   * @param {Function | Function[]} fn
   * @param {Object} context - the context will be bind to fns
   * @return {void} 
   */
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

  /**
   * @description Initializing methods
   * @private
   */
  [INIT]() {
    const keys = Object.keys(signals);
    for (const key of keys) {
      const lower = key.toLowerCase();
      const handler = function() {
        if (this[`called_${lower}`]) {
          debug(`Do not call ${lower}|${key} repeatedly. The event is listening`);
          return false;
        }

        this[`called_${lower}`] = true;
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

        if (this.listener === 'process') {
          process.on(key, recursive);
          if (this.lower) {
            process.on(lower, recursive);
          }
        } else {
          this.on(key, recursive);
          if (this.lower) {
            this.on(lower, recursive);
          }
        }
      };
      this[key] = this[lower] = handler;
    }
  }
}

module.exports = Signals;
