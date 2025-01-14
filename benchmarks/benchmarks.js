'use strict';

const fs = require('fs');
const Bench = require('./common_benchmarks');
const launchBenchs = function(path) {
  fs.readdir(path, function(err, list) {
    if (err) {
      console.error(err);
      return;
    }
    const bench = new Bench();
    //launch all benchmarks
    for (let i = 0; i < list.length; i++) {
      console.log('benchmark: ./benchs/' + list[i]);
      const m = require('./benchs/' + list[i]);
      bench.initFcts.push(m.initFct);
      bench.add(m.title, m.displaySql, m.benchFct, m.onComplete, m.promise, m.pool);
    }
    bench.suiteReady();
  });
};
fs.access('./benchs', function(err) {
  if (err) {
    fs.access('./benchmarks/benchs', function(err) {
      if (err) return;
      launchBenchs('./benchmarks/benchs');
    });
  } else {
    launchBenchs('./benchs');
  }
});
