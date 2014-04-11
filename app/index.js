'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var NpmGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Npm generator.'));

    var prompts = [{
      name: 'moduleName',
      message: 'What is the name of your module?',
    }];

    prompts.push({
      name: 'authorName',
      message: 'What is your github user name?'
    });

    prompts.push({
      name: 'fullName',
      message: 'What is your name?'
    });

    prompts.push({
      name: 'emailAddress',
      message: 'What is your email address?'
    });

    this.prompt(prompts, function (props) {
      this.moduleName = props.moduleName;
      this.authorName = props.authorName;
      this.fullName = props.fullName;
      this.emailAddress = props.emailAddress;

      this.currentYear = new Date().getFullYear();

      done();
    }.bind(this));
  },

  module: function () {
    this.mkdir('test');

    this.template('_package.json', 'package.json');
    this.template('_README.md', 'README.md');
    this.copy('jshintrc', '.jshintrc');
    this.copy('jshintignore', '.jshintignore');
    this.copy('gitignore', '.gitignore');
    this.copy('travis.yml', '.travis.yml');
    this.copy('index.js', 'index.js');
    this.copy('example.js', 'example.js');
    this.template('_test.js', 'test/index.test.js');
    this.template('_LICENSE', 'LICENSE');
  }
});

module.exports = NpmGenerator;
