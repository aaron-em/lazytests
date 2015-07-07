module.exports = function(runner, cases, test) {
  if (typeof runner !== 'function') {
    throw new Error('lazytests arg 1 must be a function');
  }

  if (! Array.isArray(cases)) {
    throw new Error('lazytests arg 2 must be an array');
  }

  if (typeof test !== 'function') {
    throw new Error('lazytests arg 3 must be a function');
  }
  
  cases.forEach(function(testCase) {
    var name = testCase[0];
    runner(name, function() {
      test.apply(test, testCase.slice(1));
    });
  });
};
