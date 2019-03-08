'use strict';

const {EventEmitter} = require('events');
const signals = require('./signals');

const INIT = Symbol('_init');

class Signals extends EventEmitter {
  constructor(options={}) {
    super(options);
    this.hooks = [];
    this[INIT]();
  }

  /**
   * @description Remove hook from hooks
   * @param {String|Number} tag
   * @return {Boolean} 
   */
  remove(tag) {
    if (typeof tag === 'number') {
      if (tag < 0) return false;
      if (tag >= this.hooks.length) return false;
      this.hooks.splice(tag, 1);
      return true;
    }

    if (typeof tag === 'string') {
      const names = this.names();
      if (!names.includes(tag)) return false;
      const hook = this.hooks.filter(hook => hook.name === tag)[0];
      this.hooks.splice(hook.index, 1);
      return true;
    }

    return false;
  }

  /**
   * @description get all name of hook
   * @return {Array<String>}
   */
  names() {
    return this.hooks.map(hook => hook.name);
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
        this.hooks.push({
          index: this.hooks.length,
          name: func.name || `anonymous_${this.hooks.length + 1}`,
          fn: func.bind(context),
        });
      }
    } else {
      this.hooks.push({index: this.hooks.length, fn: fn.bind(context)});
    }
  }

  /**
   * @description Initializing methods
   * @private
   */
  [INIT]() {
    for (const key of signals) {
      const lower = key.toLowerCase();
      const handler = function() {
        // Blocking duplicate event
        if (this[`called_${lower}`]) return false;

        this[`called_${lower}`] = true;
        let idx = 0;
        const recursive = async (...args) => {
          if (this.hooks.length === 0) return false;

          try {
            if (this.hooks.length === idx) return true;
            idx++;
            recursive(await this.hooks[idx - 1].fn.apply(this, args));
          } catch (err) {
            /* istanbul ignore next */
            throw err;
          }
        };

        process.on(key, recursive);
        process.on(lower, recursive);
        this.on(key, recursive);
        this.on(lower, recursive);
      };
      this[key] = this[lower] = handler;
    }
  }
}
const Signaler = Signals;

module.exports = Signaler;

// Typescript
module.exports.default = Signaler;
