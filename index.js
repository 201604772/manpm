var log = require('debug')('manpm');
var la = require('lazy-ass');
var check = require('check-more-types');
var Promise = require('bluebird');
var getReadme = Promise.promisify(require('get-package-readme'));

function maNpm(options) {
  la(check.object(options), 'missing input options');
  la(check.unemptyString(options.name), 'missing package name', options);
  log('fetching README for package', options.name);
  return getReadme(options.name);
}

module.exports = maNpm;

if (!module.parent) {
  log('stand alone demo');
  maNpm({ name: 'obind' })
    .then(console.log.bind(console))
    .catch(console.error.bind(console));
}
