var expect = require('chai').expect;
var lazytests = require('../lazytests');

var validResult = [
  'should do a thing', [1, 2, 1],
  'should do another thing', [2, 4, 4],
  'should do yet another thing', [3, 6, 9],
  'should do a fourth and final thing', [4, 8, 16]
];

describe('lazytests', function() {
  it('should throw on invalid arguments', function() {
    var caller = function() {
      var args = Array.prototype.slice.call(arguments);
      return function() {
        lazytests.apply(lazytests, args);
      };
    };
    
    var fn = function() {};
    
    expect(caller())
      .to.throw('arg 1 must be a function');

    expect(caller(fn))
      .to.throw('arg 2 must be an array');

    expect(caller(fn, ['lol']))
      .to.throw('arg 2 must contain only arrays');

    expect(caller(fn, []))
      .to.throw('arg 3 must be a function');

    expect(caller(fn, [], fn))
      .to.not.throw();
  });

  it('should do the right thing with valid arguments', function() {
    var result = [];
    
    var cases = [['should do a thing', 1],
                 ['should do another thing', 2],
                 ['should do yet another thing', 3],
                 ['should do a fourth and final thing', 4]];
    
    var runner = function(name, testFn) {
      result.push(name);
      testFn();
    };

    var test = function(n) {
      result.push([n, 2*n, Math.pow(n, 2)]);
    };

    lazytests(runner, cases, test);
    expect(result)
      .to.deep.equal(validResult);
  });
});
