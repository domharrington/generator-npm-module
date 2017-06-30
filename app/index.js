const Generator = require('yeoman-generator');
const slugify = require('slugg');

const packageJson = require('../package.json');

module.exports = class extends Generator {
  prompting() {
    this.log('You\'re using the fantastic Npm generator.'); // eslint-disable-line no-console

    const prompts = [
      {
        name: 'moduleName',
        message: 'What is the name of your module?',
        default: slugify(this.appname),
      },
      {
        name: 'moduleDescription',
        message: 'What is the description of the module?',
      },
      {
        name: 'authorName',
        message: 'What is your github user name?',
        store: true,
      },
      {
        name: 'fullName',
        message: 'What is your name?',
        store: true,
      },
      {
        name: 'emailAddress',
        message: 'What is your email address?',
        store: true,
      },
    ];

    return this.prompt(prompts).then((answers) => {
      this.answers = answers;
      this.answers.moduleName = slugify(answers.moduleName);
      this.answers.currentYear = new Date().getFullYear();
    });
  }
  writing() {
    this.fs.copyTpl(this.templatePath('_package.json'), this.destinationPath('package.json'), this.answers);
    this.fs.copyTpl(this.templatePath('_README.md'), this.destinationPath('README.md'), this.answers);
    this.fs.copyTpl(this.templatePath('_test.js'), this.destinationPath('test/index.test.js'), this.answers);
    this.fs.copyTpl(this.templatePath('_LICENSE'), this.destinationPath('LICENSE'), this.answers);

    this.fs.copy(this.templatePath('eslintrc'), this.destinationPath('.eslintrc'));
    this.fs.copy(this.templatePath('eslintignore'), this.destinationPath('.eslintignore'));
    this.fs.copy(this.templatePath('jsinspectrc'), this.destinationPath('.jsinspectrc'));
    this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
    this.fs.copy(this.templatePath('travis.yml'), this.destinationPath('.travis.yml'));
    this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
    this.fs.copy(this.templatePath('index.js'), this.destinationPath('index.js'));
    this.fs.copy(this.templatePath('example.js'), this.destinationPath('example.js'));
    this.fs.copy(this.templatePath('editorconfig'), this.destinationPath('.editorconfig'));
  }
  install() {
    this.npmInstall(['eslint', 'eslint-config-airbnb-base', 'eslint-plugin-import', 'nyc', 'jsinspect', 'mocha'], { 'save-dev': true })
  }
}
