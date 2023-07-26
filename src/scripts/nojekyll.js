var fs = require('fs-extra');
var path = require('path');

const base = path.resolve("");
fs.writeFileSync(base + '/out/.nojekyll', "");