'use strict';

const chai = require('chai');
const Signals = require('../..');
const signals = require('../../lib/signals');
const fs = require('fs');
const expect = chai.expect;

describe('Signals Test', function() {
  it('should instance to be created', function(done) {
    const exit = new Signals();
    expect(exit instanceof Signals);
    done();
  });

  it('should exit contains lower name of method', function(done) {
    
    const exit = new Signals({});

    for (const k of signals) {
      expect(typeof exit[k.toLowerCase()]).to.equals('function');
    }
    done();
  });

  it('should exit contains upper name of method', function(done) {
    const exit = new Signals({});

    for (const k of signals) {
      expect(typeof exit[k]).to.equals('function');
    }
    done();
  });

  it('should call the hook before program exit', function(done) {
    const exit = new Signals();
    exit.before(function(test) {
      expect(test).to.be.equals(10);
      done();
    });
    exit.sigterm();
    process.emit('SIGTERM', 10);
  });

  it('should call the hooks chain before program exit', function(done) {
    const exit = new Signals();
    exit.before([
      function(test) {
        expect(test).to.be.equals(10);
        return test * 2;
      },
      function(v) {
        expect(v).to.equals(20);
        return v * 2;
      },
      function(v) {
        expect(v).to.equals(40);
        done();
      }
    ]);
    exit.sigterm();
    process.emit('SIGTERM', 10);
  });

  it('should call the asynchronus hooks chain before program exit', async function() {
    const exit = new Signals();
    exit.before([
      async function(path) {
        return new Promise((resolve, reject) => {
          fs.stat(path, (err, stat) => {
            if (err) return reject(err);
            resolve(stat);
          });
        });
      },
      async function(stat) {
        expect(stat).to.have.property('dev');
        expect(stat).to.have.property('mode');
        expect(stat).to.have.property('uid');
      }
    ]);
    exit.sigterm();
    process.emit('SIGTERM', '/etc/passwd');
  });

  it('should no effective if repeatedly call signal method like: [sigterm|SIGTERM]', function(done) {
    const exit = new Signals();
    exit.sigterm();
    exit.SIGTERM();
    process.emit('SIGTERM');
    done();
  });

  it('should throw out an error object if given `before` invalid parameters', function(done) {
    const exit = new Signals();
    try {
      exit.before({});
    } catch (err) {
      expect(err.message).to.equals('before hook accept function or array<function>');
      done();
    }
  });

  it('should throw out an error object if given `before` an Array<string>', function(done) {
    const exit = new Signals();
    try {
      exit.before(['a']);
    } catch (err) {
      expect(err.message.endsWith('must be a function')).to.be.true;
      done();
    }
  });

  it('should close the http server and exit process gracefully', function(done) {
    const http = require('http');
    const handler = function(req, res) {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('X-Foo', 'bar');
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
    }
    const server = http.createServer(handler);
    server.listen(8088);
    const exit = new Signals();
    exit.before(function(server1){
      expect(server1.listening).to.be.true;
      server1.close(done);
    });

    exit.SIGTERM();
    process.emit('SIGTERM', server);
  });


  describe('Test method .remove() & .names()', function() {
    const fns = [
      function fn1() {},
      function fn2() {},
      function(){},
      function fn4() {},
    ];
  
    it('should get all names of hook', function(done) {
      const exit = new Signals();
      exit.before(fns, null);
      expect(exit.names().length).to.equals(4);
      done();
    });
  
    it('should remove a hook failed if given -1', function(done) {
      const exit = new Signals();
      exit.before(fns, null);
      expect(exit.remove(-1)).to.be.false;
      done();
    });
  
    it('should remove a hook failed if given 5', function(done) {
      const exit = new Signals();
      exit.before(fns, null);
      expect(exit.remove(5)).to.be.false;
      done();
    });
  
    it('should remove a hook failed if given null', function(done) {
      const exit = new Signals();
      exit.before(fns, null);
      expect(exit.remove(null)).to.be.false;
      done();
    });
  
    it('should remove a hook failed if given undefined', function(done) {
      const exit = new Signals();
      exit.before(fns, null);
      expect(exit.remove(undefined)).to.be.false;
      done();
    });
  
    it('should remove a hook to be success with index 1', function(done) {
      const exit = new Signals();
      exit.before(fns, null);
      expect(exit.remove(1)).to.be.true;
      const names = exit.names();
      expect(names.includes('fn1')).to.be.true;
      expect(names.includes('anonymous_3')).to.be.true;
      expect(names.includes('fn4')).to.be.true;
      done();
    });
  
  
    it('should remove a hook failed if given `fn5`', function(done) {
      const exit = new Signals();
      exit.before(fns, null);
      expect(exit.remove('fn5')).to.be.false;
      done();
    });
  
    it('should remove a hook to be success with name `fn4`', function(done) {
      const exit = new Signals();
      exit.before(fns, null);
      expect(exit.remove('fn4')).to.be.true;
      const names = exit.names();
      expect(names.includes('fn1')).to.be.true;
      expect(names.includes('anonymous_3')).to.be.true;
      expect(names.includes('fn2')).to.be.true;
      done();
    });
  });
  
});