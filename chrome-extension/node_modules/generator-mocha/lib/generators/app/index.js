'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');

var MochaGenerator = module.exports = function MochaGenerator(args, options) {
  yeoman.generators.Base.apply(this, arguments);
  this.sourceRoot(path.join(__dirname, '../../', 'templates'));

  this.option('ui', {
    desc: 'Choose your style of DSL (bdd, tdd, qunit, or exports)',
    type: String,
    defaults: 'bdd'
  });
};

util.inherits(MochaGenerator, yeoman.generators.Base);

MochaGenerator.prototype.setupEnv = function setupEnv() {
  this.copy('_bower.json', 'test/bower.json');
  this.copy('bowerrc', 'test/.bowerrc');
  this.copy('test.js', 'test/spec/test.js');
  this.copy('index.html', 'test/index.html');
};

MochaGenerator.prototype.install = function () {
  if (this.options['skip-install']) {
    return;
  }

  var done = this.async();
  process.chdir('test');
  this.installDependencies({
    npm: false,
    skipInstall: this.options['skip-install'],
    callback: done
  });
}
