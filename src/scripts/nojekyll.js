var fs = require('fs-extra');
var path = require('path');

const base = path.resolve("");
fs.copySync(base + '/.nojekyll', base + '/out/.nojekyll');